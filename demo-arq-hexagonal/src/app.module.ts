import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaEntity, TypeOrmCitaRepository } from './infraestructura/repositories/typeorm-cita.repository';
import { CitaController } from './infraestructura/controllers/cita.controller';
import { CrearCitaCasoDeUso } from './application/casos-de-uso/crearcita-casodeuso';
import { ListarCitaCasoDeUso } from './application/casos-de-uso/listarcitas-casodeuso';
import { PacienteEntity, TypeOrmPacienteRepository } from './infraestructura/repositories/typeorm-paciente.repository';
import { DoctorEntity, TypeOrmDoctorRepository } from './infraestructura/repositories/typeorm-doctor.repository';
import { PacienteController } from './infraestructura/controllers/paciente.controller';
import { DoctorController } from './infraestructura/controllers/doctor.controller';
import { CrearPacienteCasoDeUso } from './application/casos-de-uso/crearPaciente-casodeuso';
import { ListarPacientesCasoDeUso } from './application/casos-de-uso/listarPaciente-casodeuso';
import { CrearDoctorCasoDeUso } from './application/casos-de-uso/crearDoctor-casodeuso';
import { ListarDoctorCasoDeUso } from './application/casos-de-uso/listarDoctor-casodeuso';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [CitaEntity , PacienteEntity, DoctorEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CitaEntity, PacienteEntity,DoctorEntity]),
  ],
  controllers: [CitaController, PacienteController, DoctorController],
  providers: [
    {
      provide: 'CitaRepositoryPuerto',
      useClass: TypeOrmCitaRepository,
    },
    {
      provide: CrearCitaCasoDeUso,
      useFactory: (
        repo: TypeOrmCitaRepository,
        pacienteRepo: TypeOrmPacienteRepository,
        doctorRepo: TypeOrmDoctorRepository
      )=>
        new CrearCitaCasoDeUso(repo,pacienteRepo,doctorRepo),
      inject: ['CitaRepositoryPuerto','PacienteRepositoryPuerto','DoctorRepositoryPuerto']
    },
    {
      provide: ListarCitaCasoDeUso,
      useFactory: (repo : TypeOrmCitaRepository)=>
        new ListarCitaCasoDeUso(repo),
      inject:['CitaRepositoryPuerto']
    },
    //pacientes
    {
      provide: 'PacienteRepositoryPuerto',
      useClass: TypeOrmPacienteRepository,
    },
    {
      provide: CrearPacienteCasoDeUso,
      useFactory: (repo: TypeOrmPacienteRepository) =>
        new CrearPacienteCasoDeUso(repo),
      inject: ['PacienteRepositoryPuerto']
    },,
    {
      provide: ListarPacientesCasoDeUso,
      useFactory: (repo: TypeOrmPacienteRepository) =>
        new ListarPacientesCasoDeUso(repo),
      inject: ['PacienteRepositoryPuerto']
    },
    //proveedores Doctores
    {
      provide: 'DoctorRepositoryPuerto',
      useClass: TypeOrmDoctorRepository,
    },
    {
      provide: CrearDoctorCasoDeUso,
      useFactory: (repo: TypeOrmDoctorRepository)=>new CrearDoctorCasoDeUso(repo),
      inject: ['DoctorRepositoryPuerto']
    },
    {
      provide: ListarDoctorCasoDeUso,
      useFactory: (repo: TypeOrmDoctorRepository) => new ListarDoctorCasoDeUso(repo),
      inject: ['DoctorRepositoryPuerto']
    }
  ],
})
export class AppModule {}
