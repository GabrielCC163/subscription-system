import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDTO } from '@common/dto/pagination.dto';
import { Subscription } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { handleError } from '@common/error-handlers';

@Injectable()
export class SubscriptionsService {
  private subscriptionServiceSecretKey: string;
  private subscriptionServiceHost: string;

  constructor(private httpService: HttpService, private readonly configService: ConfigService<AppConfig>) {
    this.subscriptionServiceHost = this.configService.get('subscription_service').host;
    this.subscriptionServiceSecretKey = this.configService.get('subscription_service').secret_key;
  }

  private getHeaders() {
    return {
      headers: {
        apiKey: this.subscriptionServiceSecretKey
      },
    };
  }

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const url = `${this.subscriptionServiceHost}/subscriptions`;

    try {
      const { data } = await lastValueFrom(this.httpService.post(url, createSubscriptionDto, this.getHeaders()));
      return data;
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async findAll(pagination: PaginationDTO): Promise<Pagination<Subscription>> {
    const url = `${this.subscriptionServiceHost}/subscriptions`;

    try {
      const { data } = await lastValueFrom(this.httpService.get(url, { params: pagination, ...this.getHeaders() }));
      return data;
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async findOne(id: string): Promise<Subscription> {
    const url = `${this.subscriptionServiceHost}/subscriptions/${id}`;

    try {
      const { data } = await lastValueFrom(this.httpService.get(url, this.getHeaders()));
      if (!data) throw new NotFoundException('Subscription not found');

      return data;
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }

  async cancel(id: string): Promise<void> {
    const url = `${this.subscriptionServiceHost}/subscriptions/${id}`;

    try {
      await lastValueFrom(this.httpService.delete(url, this.getHeaders()));
    } catch (error) {
      const err = handleError(error);
      throw err;
    }
  }
}
