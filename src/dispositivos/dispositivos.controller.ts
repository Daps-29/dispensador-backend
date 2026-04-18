import { Controller, Get } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';

@Controller('dispositivos')
export class DispositivosController {
  constructor(private readonly dispositivosService: DispositivosService) {}

  @Get()
  listar() {
    return this.dispositivosService.listarTodos();
  }
}
