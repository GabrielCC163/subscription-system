import { BadRequestException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

export function handleError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message;

    if (error.response?.data?.statusCode === HttpStatus.NOT_FOUND) {
      return new NotFoundException(msg);
    }

    if (error.response?.data?.statusCode === HttpStatus.BAD_REQUEST) {
      return new BadRequestException(msg);
    }

    if (error.response?.data?.statusCode === HttpStatus.UNAUTHORIZED) {
      return new UnauthorizedException(msg);
    }

    return new Error(msg);
  }

  return error as Error;
}
