import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Subscription } from './interfaces';
import { SubscriptionPaginatedResponseDto, SubscriptionResponseDto } from './dto/subscription-response.dto';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  private baseUrl: string;

  constructor(private readonly subscriptionsService: SubscriptionsService, private readonly configService: ConfigService<AppConfig>) {
    this.baseUrl = this.configService.get('base_url');
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription' })
  @ApiCreatedResponse({ type: SubscriptionResponseDto, description: 'Subscription created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiOkResponse({ type: SubscriptionPaginatedResponseDto, description: 'Paginated response of all subscriptions' })
  @ApiNotFoundResponse({ description: 'Subscriptions not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll(@Query() pagination: PaginationDTO): Promise<Pagination<Subscription>> {
    pagination.route = `${this.baseUrl}/subscriptions`;
    return this.subscriptionsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one subscription by ID' })
  @ApiOkResponse({ type: SubscriptionResponseDto, description: 'Subscription found' })
  @ApiNotFoundResponse({ description: 'Subscription not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Subscription> {
    return this.subscriptionsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Subscription canceled' })
  @ApiNotFoundResponse({ description: 'Subscription not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async cancel(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.subscriptionsService.cancel(id);
  }
}
