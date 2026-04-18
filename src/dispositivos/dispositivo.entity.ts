import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Alimentacion } from '../alimentacion/alimentacion.entity';

@Entity('dispositivos')
export class Dispositivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  dispositivoId: string;

  @Column({ unique: true })
  mac: string;

  @Column({ nullable: true })
  nombre: string;

  @Column({ default: false })
  conectado: boolean;

  @Column({ nullable: true })
  ultimaConexion: Date;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @OneToMany(() => Alimentacion, (alimentacion) => alimentacion.dispositivo)
  alimentaciones: Alimentacion[];
}
