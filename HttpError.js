export default class HttpError extends Error {
  constructor(params) {
    super();
    const error = params || {};
    this.status = error.status || 500;
    this.code = error.code || 'UNEXPECTED_ERROR';
    this.message = error.message || 'Occur Unexpected Error';
  }
}
