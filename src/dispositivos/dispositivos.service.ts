import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Dispositivo } from './dispositivo.entity';

@Injectable()
export class DispositivosService {
  private readonly logger = new Logger(DispositivosService.name);

  constructor(
    @InjectRepository(Dispositivo)
    private readonly repo: Repository<Dispositivo>,
  ) {}

  async registrarPorMac(mac: string): Promise<Dispositivo> {
    let dispositivo = await this.repo.findOne({ where: { mac } });

    if (!dispositivo) {
      const dispositivoId = randomUUID();
      dispositivo = this.repo.create({ mac, dispositivoId, nombre: mac });
      this.logger.log(
        `Nuevo dispositivo registrado — mac: ${mac}, id: ${dispositivoId}`,
      );
    }

    dispositivo.conectado = true;
    dispositivo.ultimaConexion = new Date();
    return this.repo.save(dispositivo);
  }

  async registrarOActualizar(dispositivoId: string): Promise<Dispositivo> {
    if (!dispositivoId || dispositivoId === 'null' || dispositivoId === 'undefined') {
      throw new Error(`dispositivoId inválido: "${dispositivoId}"`);
    }

    let dispositivo = await this.repo.findOne({ where: { dispositivoId } });

    if (!dispositivo) {
      dispositivo = this.repo.create({
        dispositivoId,
        mac: dispositivoId,
        nombre: dispositivoId,
      });
      this.logger.log(`Nuevo dispositivo registrado: ${dispositivoId}`);
    }

    dispositivo.conectado = true;
    dispositivo.ultimaConexion = new Date();
    return this.repo.save(dispositivo);
  }

  async marcarDesconectado(dispositivoId: string): Promise<void> {
    await this.repo.update({ dispositivoId }, { conectado: false });
    this.logger.log(`Dispositivo desconectado: ${dispositivoId}`);
  }

  async buscarPorDispositivoId(
    dispositivoId: string,
  ): Promise<Dispositivo | null> {
    return this.repo.findOne({ where: { dispositivoId } });
  }

  async listarTodos(): Promise<Dispositivo[]> {
    return this.repo.find({ order: { ultimaConexion: 'DESC' } });
  }
}
