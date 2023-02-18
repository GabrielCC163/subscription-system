import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Subscription } from './interfaces';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  private baseUrl: string;

  constructor(private readonly subscriptionsService: SubscriptionsService, private readonly configService: ConfigService<AppConfig>) {
    this.baseUrl = this.configService.get('base_url');
  }

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO): Promise<Pagination<Subscription>> {
    return this.subscriptionsService.findAll(pagination, {
      page: pagination.page,
      limit: pagination.limit,
      route: `${this.baseUrl}/subscriptions`
    });
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Subscription> {
    return this.subscriptionsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.subscriptionsService.remove(id);
  }
}
