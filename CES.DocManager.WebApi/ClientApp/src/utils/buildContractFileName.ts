const INVALID_FILE_NAME_CHARS = /[<>:"/\\|?*]/g;

function sanitizeFileNamePart(part: string): string {
  return part.trim().replace(INVALID_FILE_NAME_CHARS, '_');
}

export default function buildContractFileName(
  contractNumber: string,
  organizationName: string,
  contractType: string,
): string {
  const number = sanitizeFileNamePart(contractNumber);
  const organization = sanitizeFileNamePart(organizationName);
  const type = sanitizeFileNamePart(contractType);

  return `${number} ${organization} - ${type}.doc`;
}
