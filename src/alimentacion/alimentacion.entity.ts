import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dispositivo } from '../dispositivos/dispositivo.entity';

export enum TipoAlimentacion {
  COMIDA = 'comida',
  AGUA = 'agua',
}

@Entity('alimentaciones')
export class Alimentacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dispositivo, (dispositivo) => dispositivo.alimentaciones, {
    onDelete: 'CASCADE',
  })
  dispositivo: Dispositivo;

  @Column({ type: 'enum', enum: TipoAlimentacion })
  tipo: TipoAlimentacion;

  @Column('decimal', { precision: 5, scale: 2 })
  porcentaje: number;

  @Column('decimal', { precision: 8, scale: 2 })
  gramos: number;

  @CreateDateColumn()
  dispensadoEn: Date;
}
