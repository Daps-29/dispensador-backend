import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alimentacion, TipoAlimentacion } from './alimentacion.entity';
import { Dispositivo } from '../dispositivos/dispositivo.entity';

interface DatosAlimentacion {
  tipo: TipoAlimentacion;
  porcentaje: number;
  gramos: number;
}

@Injectable()
export class AlimentacionService {
  private readonly logger = new Logger(AlimentacionService.name);

  constructor(
    @InjectRepository(Alimentacion)
    private readonly repo: Repository<Alimentacion>,
  ) {}

  async registrar(dispositivo: Dispositivo, datos: DatosAlimentacion): Promise<Alimentacion> {
    const registro = this.repo.create({ ...datos, dispositivo });
    const guardado = await this.repo.save(registro);
    this.logger.log(
      `Alimentación registrada — dispositivo: ${dispositivo.dispositivoId}, tipo: ${datos.tipo}, gramos: ${datos.gramos}g, porcentaje: ${datos.porcentaje}%`,
    );
    return guardado;
  }

  async ultimoRegistro(dispositivoId: string): Promise<Alimentacion | null> {
    return this.repo.findOne({
      where: { dispositivo: { dispositivoId } },
      order: { dispensadoEn: 'DESC' },
      relations: ['dispositivo'],
    });
  }

  async historialGeneral(): Promise<Alimentacion[]> {
    return this.repo.find({
      order: { dispensadoEn: 'DESC' },
      relations: ['dispositivo'],
      take: 100,
    });
  }

  async historial(dispositivoId: string): Promise<Alimentacion[]> {
    return this.repo.find({
      where: { dispositivo: { dispositivoId } },
      order: { dispensadoEn: 'DESC' },
      relations: ['dispositivo'],
    });
  }
}
