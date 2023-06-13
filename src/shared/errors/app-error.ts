export class AppError extends Error {
  message;
  statusCode;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
