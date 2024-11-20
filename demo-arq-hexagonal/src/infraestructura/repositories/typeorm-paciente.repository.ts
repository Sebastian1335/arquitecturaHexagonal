import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteRepositoryPuerto } from 'src/domain/puertos/paciente-repository-puerto';
import { Paciente } from 'src/domain/entidades/paciente.entity';


@Entity('pacientes')
export class PacienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;
}



@Injectable()
export class TypeOrmPacienteRepository implements PacienteRepositoryPuerto {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepo: Repository<PacienteEntity>,
  ) {}

  async crear(paciente: Paciente): Promise<Paciente> {
    const nuevoPaciente = this.pacienteRepo.create(paciente);
    return this.pacienteRepo.save(nuevoPaciente);
  }

  async listar(): Promise<Paciente[]> {
    return this.pacienteRepo.find();
  }

  async existe(pacienteId: number): Promise<boolean> {
      const count = await this.pacienteRepo.count({where: {id: pacienteId}});
      return count > 0;
  }
}
