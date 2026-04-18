import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from './dispositivo.entity';
import { DispositivosService } from './dispositivos.service';
import { DispositivosController } from './dispositivos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dispositivo])],
  controllers: [DispositivosController],
  providers: [DispositivosService],
  exports: [DispositivosService],
})
export class DispositivosModule {}
