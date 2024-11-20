import { CitaRepositoryPuerto } from "src/domain/puertos/cita-repository-puerto";
import { Cita } from "src/domain/entidades/cita.entity";
import {Injectable} from '@nestjs/common'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PacienteEntity } from "./typeorm-paciente.repository";
import { DoctorEntity } from "./typeorm-doctor.repository";


@Entity('citas')
export class CitaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PacienteEntity,{nullable: false})
    pacienteId: PacienteEntity;

    @ManyToOne(() => DoctorEntity, {nullable: false})
    doctorId: DoctorEntity;

    @Column()
    date:Date;


}

@Injectable()
export class TypeOrmCitaRepository implements CitaRepositoryPuerto{

    constructor(
        @InjectRepository(CitaEntity)
        private readonly repository: Repository<CitaEntity>,
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>,
        @InjectRepository(DoctorEntity)
        private readonly doctorRepository: Repository<DoctorEntity>,
    ){}


    async create(cita: Cita): Promise<Cita> {
        const paciente = await this.pacienteRepository.findOne({
            where: {id: cita.pacienteID}
        })
        if (!paciente) {
            throw new Error(`El paciente ${cita.pacienteID} no existe`);
          }
        const doctor = await this.doctorRepository.findOne({
            where: {id: cita.doctorID}
        })
        if (!doctor) {
            throw new Error(`El doctor ${cita.doctorID} no existe`);
          }
        const CitaEntity = this.repository.create({
            date: cita.date,
            pacienteId: paciente,
            doctorId: doctor
        })
        const savedCita = await this.repository.save(CitaEntity);
        return new Cita(
            savedCita.id,
            savedCita.pacienteId.id,
            savedCita.doctorId.id,
            savedCita.date
        )

    }
    async findAll(): Promise<Cita[]> {
        const entities = await this.repository.find({
            relations: ['pacienteId', 'doctorId']
        });
        console.log(entities)
        return entities.map((entity) => 
            new Cita(
                entity.id,
                entity.pacienteId.id,
                entity.doctorId.id,
                entity.date
            )
        )
    }
    
}



