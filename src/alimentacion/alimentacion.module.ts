import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimentacion } from './alimentacion.entity';
import { AlimentacionService } from './alimentacion.service';
import { AlimentacionController } from './alimentacion.controller';
import { DispositivosModule } from '../dispositivos/dispositivos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alimentacion]), DispositivosModule],
  controllers: [AlimentacionController],
  providers: [AlimentacionService],
  exports: [AlimentacionService],
})
export class AlimentacionModule {}
