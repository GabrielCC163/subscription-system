import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { handleError } from '@common/error-handlers';
import { SubscriptionEntity } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaService } from '@modules/messaging/kafka.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';

@Injectable()
export class SubscriptionsService {
  private apiSharedSecret: string;

  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    private kafka: KafkaService,
    private readonly configService: ConfigService<AppConfig>
  ) {
    this.apiSharedSecret = this.configService.get('api_shared_secret');
  }

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

      const newSubscription = await this.subscriptionRepository.save(createSubscriptionDto);

      const token = jwt.sign({ ...newSubscription }, this.apiSharedSecret);
      this.kafka.emit('subscription-service.new-subscription', { headers: { 'x-auth-token': token }, value: { ...newSubscription } });
      return newSubscription;
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async findAll(pagination: PaginationDTO): Promise<Pagination<SubscriptionEntity>> {
    const { page, limit, route, email } = pagination;
    const options: IPaginationOptions = { page, limit, route };

    try {
      const searchOptions = { where: {}, order: { createdAt: 'DESC' } } as any;

      if (email) {
        searchOptions.where['email'] = email;
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
