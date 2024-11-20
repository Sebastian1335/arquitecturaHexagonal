import { Paciente } from "src/domain/entidades/paciente.entity";
import { PacienteRepositoryPuerto } from "src/domain/puertos/paciente-repository-puerto";

export class CrearPacienteCasoDeUso{
    constructor(
        private readonly pacienteRepository: PacienteRepositoryPuerto,
    ){}

    async execute(paciente: Paciente): Promise<Paciente>{
        return this.pacienteRepository.crear(paciente);
    }
}