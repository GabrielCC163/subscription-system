import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { Subscription } from './interfaces';

@Injectable()
export class SubscriptionsService {
  create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return 'This action adds a new subscription';
  }

  findAll(pagination: PaginationDTO, options: IPaginationOptions): Promise<Pagination<Subscription>> {
    return `This action returns all subscriptions`;
  }

  findOne(id: string): Promise<Subscription> {
    return `This action returns a #${id} subscription`;
  }

  remove(id: string): Promise<void> {
    return `This action removes a #${id} subscription`;
  }
}
