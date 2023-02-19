import { BaseResponseDto } from '@common/dto/base-response.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '../enum';

export class SubscriptionResponseDto extends BaseResponseDto {
    @ApiProperty({ example: 'elon@email.com' })
    email: string;

    @ApiPropertyOptional({ example: 'Elon' })
    firstName?: string;

    @ApiPropertyOptional({ enum: GenderEnum, enumName: 'GenderEnum' })
    gender?: GenderEnum;

    @ApiProperty({ example: '1997-01-01' })
    dateOfBirth: string;

    @ApiProperty({ example: true })
    consent: boolean;

    @ApiProperty({ example: 'abc-123' })
    newsletterId: string;
}