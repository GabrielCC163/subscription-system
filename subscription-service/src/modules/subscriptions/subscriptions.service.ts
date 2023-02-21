import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { handleError } from '@common/error-handlers';
import { SubscriptionEntity } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) { }

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionEntity> {
    const { email, newsletterId, consent } = createSubscriptionDto;
    if (!consent) throw new BadRequestException('User must consent to the terms');

    try {
      const subscription = await this.subscriptionRepository.findOne({
        where: {
          email,
          newsletterId
        }
      });

      if (subscription) throw new BadRequestException(`Subscription already exists for newsletter ${newsletterId}`);
      return await this.subscriptionRepository.save(createSubscriptionDto);
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async findAll(pagination: PaginationDTO, options: IPaginationOptions): Promise<Pagination<SubscriptionEntity>> {
    try {
      const searchOptions = { where: {}, order: { createdAt: 'DESC' } } as any;

      if (pagination.email) {
        searchOptions.where['email'] = pagination.email;
      }

      return paginate<SubscriptionEntity>(this.subscriptionRepository, options, searchOptions);
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async findOne(id: string): Promise<SubscriptionEntity | null> {
    try {
      return await this.subscriptionRepository.findOneBy({ id });
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async cancel(id: string): Promise<void> {
    try {
      const subscription = await this.subscriptionRepository.findOneBy({ id });
      if (!subscription) throw new NotFoundException('Subscription not found');

      await this.subscriptionRepository.softDelete(id);
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }
}
