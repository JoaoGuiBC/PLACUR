export function maskPhone(number: string) {
  const maskedNumber = number
    .replace(/\D/g, "")
    .replace(/(\d{1})/, "($1")
    .replace(/(\d)(\d{1})/, "$1$2) ")
    .replace(/(\d{4})(\d{1})/, "$1-$2")
    .replace(/(\d{4})([-])(\d{5})/, "$1$3")
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .replace(/([-])(\d{4})(\d)/, "$1$2");

  return maskedNumber;
}
