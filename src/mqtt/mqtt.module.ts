import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: config.getOrThrow<string>('MQTT_BROKER_URL'),
            username: config.getOrThrow<string>('MQTT_USERNAME'),
            password: config.getOrThrow<string>('MQTT_PASSWORD'),
            clientId: config.getOrThrow<string>('MQTT_CLIENT_ID'),
          },
        }),
      },
    ]),
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
