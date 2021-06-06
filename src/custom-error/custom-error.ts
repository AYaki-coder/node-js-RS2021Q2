export class CustomError extends Error {
  readonly code: number;
  constructor(message: string, responseCode = 404) {
    super(message);
    this.code = responseCode;
  }
}
