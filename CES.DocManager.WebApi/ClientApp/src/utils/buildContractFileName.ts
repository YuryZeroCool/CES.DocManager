const INVALID_FILE_NAME_CHARS = /[<>:"/\\|?*]/g;

function sanitizeFileNamePart(part: string): string {
  return part.trim().replace(INVALID_FILE_NAME_CHARS, '');
}

export default function buildContractFileName(
  contractNumber: string,
  organizationName: string,
  contractType: string,
): string {
  const number = contractNumber.trim().replace(/\//g, '-');
  const organization = sanitizeFileNamePart(organizationName);
  const type = sanitizeFileNamePart(contractType).toLocaleLowerCase('ru');

  return `${number} ${organization} - ${type}.doc`.replace(/_/g, '');
}
