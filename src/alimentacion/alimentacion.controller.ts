import { Controller, Get, Param } from '@nestjs/common';
import { AlimentacionService } from './alimentacion.service';

@Controller('alimentacion')
export class AlimentacionController {
  constructor(private readonly alimentacionService: AlimentacionService) {}

  @Get()
  historialGeneral() {
    return this.alimentacionService.historialGeneral();
  }

  @Get(':dispositivoId')
  historial(@Param('dispositivoId') dispositivoId: string) {
    return this.alimentacionService.historial(dispositivoId);
  }
}
