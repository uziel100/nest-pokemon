import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class UniqueConstraintError extends HttpException {
  constructor(
    objectOrError?: any,
    descriptionOrOptions: string | HttpExceptionOptions = 'Not Found',
  ) {
    console.log('🚀 ~ UniqueConstraintError ~ descriptionOrOptions:', {
      objectOrError,
      descriptionOrOptions,
    });
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);

    super(
      HttpException.createBody(
        objectOrError,
        description!,
        HttpStatus.NOT_FOUND,
      ),
      HttpStatus.NOT_FOUND,
      httpExceptionOptions,
    );
  }
}
