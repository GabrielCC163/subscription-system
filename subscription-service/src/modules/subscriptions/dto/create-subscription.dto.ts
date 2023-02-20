import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '../enum';
export class CreateSubscriptionDto {
  @ApiProperty({ example: 'elon@email.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Elon' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ enum: GenderEnum, enumName: 'GenderEnum' })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @ApiProperty({ example: '1997-01-01' })
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  consent: boolean;

  @ApiProperty({ example: 'abc-123' })
  @IsNotEmpty()
  @IsString()
  newsletterId: string;
}
