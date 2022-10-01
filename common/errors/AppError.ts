import { Metadata, ServerErrorResponse, status } from '@grpc/grpc-js'

class AppError implements ServerErrorResponse {
  code?: status | undefined;
  details?: string | undefined;
  metadata?: Metadata | undefined;
  name: string;
  message: string;
  stack?: string | undefined;

  constructor({ code, message, name, details, metadata, stack }: AppError) {
    this.code = code;
    this.message = message;
    this.name = name;
    this.details = details;
    this.metadata = metadata;
    this.stack = stack;
  }
}

export default AppError