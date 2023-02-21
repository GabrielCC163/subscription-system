import { AppConfig } from '@config/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private subscriptionServiceApiKey: string;

    constructor(private readonly configService: ConfigService<AppConfig>) {
        this.subscriptionServiceApiKey = this.configService.get('api_key');
    }

    validateApiKey(apiKey: string) {
        return apiKey === this.subscriptionServiceApiKey;
    }
}