/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderByEnum } from '../enums/orderBy.enum';

export class PaginationDTO {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @Min(1)
  @Max(50)
  limit: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string = '';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy: string = '';

  @ApiPropertyOptional({ enum: OrderByEnum, default: OrderByEnum.DESC })
  @IsOptional()
  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum = OrderByEnum.DESC;
}
