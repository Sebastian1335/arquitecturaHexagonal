import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearDoctorCasoDeUso } from 'src/application/casos-de-uso/crearDoctor-casodeuso';
import { ListarDoctorCasoDeUso } from 'src/application/casos-de-uso/listarDoctor-casodeuso';
import { Doctor } from 'src/domain/entidades/doctor.entity';


@Controller('Doctores')
export class DoctorController {
  constructor(
    private readonly crearPacienteCasoDeUso: CrearDoctorCasoDeUso,
    private readonly listarPacientesCasoDeUso: ListarDoctorCasoDeUso,
  ) {}

  @Post()
  async crearPaciente(@Body() paciente: Doctor): Promise<Doctor> {
    return this.crearPacienteCasoDeUso.execute(paciente);
  }

  @Get()
  async listarPacientes(): Promise<Doctor[]> {
    return this.listarPacientesCasoDeUso.execute();
  }
}