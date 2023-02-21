import { BaseResponseDto, exampleDate } from '@common/dto/base-response.dto';
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

export class SubscriptionPaginatedResponseDto {
    @ApiProperty({ example: [{ id: '5654860a-4834-42cc-bd7e-01aba4de80b', createdAt: exampleDate, email: 'elon@email.com', firstName: 'Elon', gender: GenderEnum.M, dateOfBirth: '1997-01-01', consent: true, newsletterId: 'abc-123' }] })
    items: [SubscriptionResponseDto]

    @ApiProperty({ example: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 } })
    meta: {
        totalItems: number,
        itemCount: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number

    }

    @ApiProperty({ example: { first: 'http://localhost:3001/subscriptions?limit=10', previous: '', next: '', last: 'http://localhost:3001/subscriptions?page=1&limit=10' } })
    links: {
        first: "http://localhost:3001/subscriptions?limit=10",
        previous: string,
        next: string,
        last: string
    }
}