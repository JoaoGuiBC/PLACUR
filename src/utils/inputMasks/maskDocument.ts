export function maskDocument(document: string) {
  const maskedDocument = document
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1-$2')
    .replace(/([-])(\d{2})(\d)/, '$1$2')

  return maskedDocument
}
