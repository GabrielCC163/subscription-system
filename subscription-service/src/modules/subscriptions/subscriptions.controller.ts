import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { SubscriptionEntity } from './entities/subscription.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  private baseUrl: string;

  constructor(private readonly subscriptionsService: SubscriptionsService, private readonly configService: ConfigService<AppConfig>) {
    this.baseUrl = this.configService.get('base_url');
  }

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO): Promise<Pagination<SubscriptionEntity>> {
    const { page, limit } = pagination;
    return this.subscriptionsService.findAll(pagination, { page, limit, route: `${this.baseUrl}/subscriptions` });
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<SubscriptionEntity | null> {
    return this.subscriptionsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  cancel(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.subscriptionsService.cancel(id);
  }
}
