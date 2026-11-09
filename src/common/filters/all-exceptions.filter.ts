import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'node:http';

type ErrorResponseBody = {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readMessage(value: unknown): string | string[] | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value;
  }

  return undefined;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const body = toErrorBody(exception, request.url);

    response.status(body.statusCode).json(body);
  }
}

function toErrorBody(exception: unknown, path: string): ErrorResponseBody {
  const timestamp = new Date().toISOString();

  if (exception instanceof HttpException) {
    const statusCode = exception.getStatus();
    const parsed = readHttpException(exception, statusCode);

    return {
      statusCode,
      message: parsed.message,
      error: parsed.error,
      timestamp,
      path,
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
    error:
      STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR] ?? 'Internal Server Error',
    timestamp,
    path,
  };
}

function readHttpException(
  exception: HttpException,
  statusCode: number,
): { message: string | string[]; error: string } {
  const fallbackError = STATUS_CODES[statusCode] ?? 'Error';
  const response = exception.getResponse();

  if (typeof response === 'string') {
    return { message: response, error: fallbackError };
  }

  if (isRecord(response)) {
    return {
      message: readMessage(response.message) ?? exception.message,
      error:
        typeof response.error === 'string' ? response.error : fallbackError,
    };
  }

  return { message: exception.message, error: fallbackError };
}
