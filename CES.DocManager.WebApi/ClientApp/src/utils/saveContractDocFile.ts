interface SaveFilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: SaveFilePickerAcceptType[];
}

interface ContractFileWritableStream {
  write(data: Blob): Promise<void>;
  close(): Promise<void>;
}

interface ContractFileHandle {
  createWritable(): Promise<ContractFileWritableStream>;
}

type ShowSaveFilePicker = (
  options?: SaveFilePickerOptions,
) => Promise<ContractFileHandle>;

function getShowSaveFilePicker(): ShowSaveFilePicker | undefined {
  const { showSaveFilePicker } = window as Window & {
    showSaveFilePicker?: ShowSaveFilePicker;
  };
  return showSaveFilePicker;
}

async function saveWithFilePicker(blob: Blob, fileName: string): Promise<boolean> {
  const showSaveFilePicker = getShowSaveFilePicker();
  if (!showSaveFilePicker) {
    return false;
  }

  try {
    const handle = await showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: 'Документ Word',
          accept: {
            'application/msword': ['.doc'],
          },
        },
      ],
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Сохранение отменено');
    }
    throw error;
  }
}

function saveWithDownloadLink(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default async function saveContractDocFile(blob: Blob, fileName: string): Promise<void> {
  const savedViaPicker = await saveWithFilePicker(blob, fileName);
  if (!savedViaPicker) {
    saveWithDownloadLink(blob, fileName);
  }
}
