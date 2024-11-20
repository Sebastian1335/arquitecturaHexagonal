import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaEntity, TypeOrmCitaRepository } from './infraestructura/repositories/typeorm-cita.repository';
import { CitaController } from './infraestructura/controllers/cita.controller';
import { CrearCitaCasoDeUso } from './application/casos-de-uso/crearcita-casodeuso';
import { ListarCitaCasoDeUso } from './application/casos-de-uso/listarcitas-casodeuso';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [CitaEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CitaEntity]),
  ],
  controllers: [CitaController],
  providers: [
    {
      provide: 'CitaRepositoryPuerto',
      useClass: TypeOrmCitaRepository,
    },
    {
      provide: CrearCitaCasoDeUso,
      useFactory: (repo: TypeOrmCitaRepository)=>
        new CrearCitaCasoDeUso(repo),
      inject: ['CitaRepositoryPuerto']
    },
    {
      provide: ListarCitaCasoDeUso,
      useFactory: (repo : TypeOrmCitaRepository)=>
        new ListarCitaCasoDeUso(repo),
      inject:['CitaRepositoryPuerto']
    }
  ],
})
export class AppModule {}
