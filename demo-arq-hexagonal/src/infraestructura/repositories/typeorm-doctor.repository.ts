import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/domain/entidades/doctor.entity';
import { DoctorRepositoryPuerto } from 'src/domain/puertos/doctor-repository-puerto';


@Entity('doctores')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;
}

@Injectable()
export class TypeOrmDoctorRepository implements DoctorRepositoryPuerto {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepo: Repository<DoctorEntity>,
  ) {}

  async crear(doctor: Doctor): Promise<Doctor> {
    const nuevoDoctor = this.doctorRepo.create(doctor);
    return this.doctorRepo.save(nuevoDoctor);
  }

  async listar(): Promise<Doctor[]> {
    return this.doctorRepo.find();
  }

  async existe(doctorId: number): Promise<boolean> {
    const count = await this.doctorRepo.count({ where: { id: doctorId } });
    return count > 0;
  }

}