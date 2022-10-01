
class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code: string;

  constructor(message: string, code = 'error', statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default AppError;