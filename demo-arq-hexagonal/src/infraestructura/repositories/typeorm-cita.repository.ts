import { CitaRepositoryPuerto } from "src/domain/puertos/cita-repository-puerto";
import { Cita } from "src/domain/entidades/cita.entity";
import {Injectable} from '@nestjs/common'
import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Entity('citas')
export class CitaEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    pacienteNombre: string;

    @Column()
    doctorNombre: string;

    @Column()
    date:Date;


}

@Injectable()
export class TypeOrmCitaRepository implements CitaRepositoryPuerto{

    constructor(
        @InjectRepository(CitaEntity)
        private readonly repository: Repository<CitaEntity>,
    ){}


    async create(cita: Cita): Promise<Cita> {
        const entity = this.repository.create(cita);
        const savedEntity = await this.repository.save(entity);
        return new Cita(
            savedEntity.id,
            savedEntity.pacienteNombre,
            savedEntity.doctorNombre,
            savedEntity.date,
        );

    }
    async findAll(): Promise<Cita[]> {
        const entities = await this.repository.find();
        return entities.map(
            (entity) => 
                new Cita(
                    entity.id,
                    entity.pacienteNombre,
                    entity.doctorNombre,
                    entity.date,
                )
        );
    }
    
}



