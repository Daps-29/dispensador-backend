import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);

  constructor(@Inject('MQTT_CLIENT') private readonly client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();
    this.logger.log('Conectado al broker MQTT');
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  publish(topic: string, payload: unknown) {
    this.client.emit(topic, payload);
  }
}
