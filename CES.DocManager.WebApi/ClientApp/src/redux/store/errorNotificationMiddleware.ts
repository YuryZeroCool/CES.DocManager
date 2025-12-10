import { showNotification } from '@mantine/notifications';
import { Middleware, AnyAction } from 'redux';

interface RejectedActionPayload {
  message?: string;
  response?: {
    data?: {
      errors?: Record<string, unknown>;
      message?: string;
      title?: string;
    };
  };
  data?: {
    errors?: Record<string, unknown>;
    message?: string;
    title?: string;
  };
  errors?: Record<string, unknown>;
  title?: string;
}

interface RejectedAction extends AnyAction {
  type: string;
  payload?: RejectedActionPayload | string;
  error?: boolean | Error;
}

function extractValidationErrors(errors: unknown): string | null {
  if (errors && typeof errors === 'object') {
    const obj = errors as Record<string, unknown>;
    const messages: string[] = [];
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      if (Array.isArray(val)) {
        val.forEach((msg) => { if (typeof msg === 'string') messages.push(msg); });
      } else if (typeof val === 'string') {
        messages.push(val);
      }
    });
    if (messages.length > 0) return messages.join('\n');
  }
  return null;
}

function getErrorMessage(action: RejectedAction): string {
  const { payload, error } = action;

  if (typeof payload === 'string') return payload;

  if (!payload || typeof payload !== 'object') {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'Произошла ошибка';
  }

  const data = payload.response?.data ?? payload.data ?? payload;
  const validationMsg = extractValidationErrors(
    typeof data === 'object' && data !== null && 'errors' in data ? data.errors : null,
  );
  if (validationMsg) return validationMsg;

  if (typeof data === 'object' && data !== null) {
    if ('message' in data && typeof data.message === 'string' && data.message.trim() !== '') {
      return data.message;
    }
    if ('title' in data && typeof data.title === 'string' && data.title.trim() !== '') {
      return data.title;
    }
  }

  if ('message' in payload && typeof payload.message === 'string' && payload.message.trim() !== '') {
    return payload.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Произошла ошибка';
}

const errorNotificationMiddleware: Middleware = () => (next) => (action: AnyAction) => {
  const result = next(action);

  if (typeof action.type === 'string' && action.type.endsWith('/rejected')) {
    const customMessages: Record<string, string> = {
      'createOrganization/rejected': 'Не удалось создать организацию. Проверьте поля формы.',
      'editOrganization/rejected': 'Не удалось сохранить изменения организации.',
      'deleteOrganization/rejected': 'Не удалось удалить организацию.',
      'searchOrganizations/rejected': 'Не удалось получить список организаций.',
      'getOrganizationType/rejected': 'Не удалось загрузить типы организаций.',
    };

    const rejectedAction = action as RejectedAction;
    const message = customMessages[rejectedAction.type] ?? getErrorMessage(rejectedAction);
    showNotification({
      title: 'Ошибка',
      color: 'red',
      message,
      withCloseButton: true,
      styles: { root: { borderColor: 'red' } },
    });
  }

  return result;
};

export default errorNotificationMiddleware;
