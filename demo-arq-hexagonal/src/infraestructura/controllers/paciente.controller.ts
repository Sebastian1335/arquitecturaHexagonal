import { Controller,Post,Get,Body } from "@nestjs/common";
import { CrearPacienteCasoDeUso } from "src/application/casos-de-uso/crearPaciente-casodeuso";
import { ListarPacientesCasoDeUso } from "src/application/casos-de-uso/listarPaciente-casodeuso";
import { Paciente } from "src/domain/entidades/paciente.entity";


@Controller('pacientes')
export class PacienteController {
  constructor(
    private readonly crearPacienteCasoDeUso: CrearPacienteCasoDeUso,
    private readonly listarPacientesCasoDeUso: ListarPacientesCasoDeUso,
  ) {}

  @Post()
  async crearPaciente(@Body() paciente: Paciente): Promise<Paciente> {
    return this.crearPacienteCasoDeUso.execute(paciente);
  }

  @Get()
  async listarPacientes(): Promise<Paciente[]> {
    return this.listarPacientesCasoDeUso.execute();
  }
}