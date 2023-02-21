import { BadRequestException, NotFoundException } from '@nestjs/common';
import axios from 'axios';

export function handleError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message || error.message;

    if (error.response?.data?.statusCode === 404) {
      return new NotFoundException(msg);
    }

    if (error.response?.data?.statusCode === 400) {
      return new BadRequestException(msg);
    }

    return new Error(msg);
  }

  return error as Error;
}
