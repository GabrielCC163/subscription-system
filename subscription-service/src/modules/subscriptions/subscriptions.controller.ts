import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { SubscriptionEntity } from './entities/subscription.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) { }

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO): Promise<Pagination<SubscriptionEntity>> {
    return this.subscriptionsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<SubscriptionEntity | null> {
    return this.subscriptionsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async cancel(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.subscriptionsService.cancel(id);
  }
}
