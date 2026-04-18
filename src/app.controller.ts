import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { DispositivosService } from './dispositivos/dispositivos.service';
import { AlimentacionService } from './alimentacion/alimentacion.service';
import { MqttService } from './mqtt/mqtt.service';
import { TipoAlimentacion } from './alimentacion/alimentacion.entity';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly dispositivosService: DispositivosService,
    private readonly alimentacionService: AlimentacionService,
    private readonly mqttService: MqttService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('dispensador/registro')
  async handleRegistro(@Payload() datos: { mac: string }) {
    const dispositivo = await this.dispositivosService.registrarPorMac(datos.mac);
    this.mqttService.publish(`dispensador/${datos.mac}/bienvenida`, {
      dispositivoId: dispositivo.dispositivoId,
    });
    this.logger.log(`Registro exitoso — mac: ${datos.mac}, id: ${dispositivo.dispositivoId}`);
  }

  @MessagePattern('dispensador/+/conectar')
  async handleConectar(@Payload() _data: unknown, @Ctx() ctx: MqttContext) {
    const dispositivoId = ctx.getTopic().split('/')[1];
    await this.dispositivosService.registrarOActualizar(dispositivoId);
  }

  @MessagePattern('dispensador/+/desconectar')
  async handleDesconectar(@Payload() _data: unknown, @Ctx() ctx: MqttContext) {
    const dispositivoId = ctx.getTopic().split('/')[1];
    await this.dispositivosService.marcarDesconectado(dispositivoId);
  }

  @MessagePattern('dispensador/+/alimentacion')
  async handleAlimentacion(
    @Payload() datos: { tipo: TipoAlimentacion; porcentaje: number; gramos: number },
    @Ctx() ctx: MqttContext,
  ) {
    const dispositivoId = ctx.getTopic().split('/')[1];
    const dispositivo = await this.dispositivosService.registrarOActualizar(dispositivoId);
    await this.alimentacionService.registrar(dispositivo, datos);
  }
}
