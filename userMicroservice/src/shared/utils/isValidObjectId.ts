// Um identificador do MongoDB é uma string hexadecimal de 24 caracteres.
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
