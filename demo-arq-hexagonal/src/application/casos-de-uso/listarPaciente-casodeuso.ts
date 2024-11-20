import { Paciente } from "src/domain/entidades/paciente.entity";
import { PacienteRepositoryPuerto } from "src/domain/puertos/paciente-repository-puerto";

export class ListarPacientesCasoDeUso{
    constructor(
        private readonly PacienteRepository: PacienteRepositoryPuerto,
    ){}

    async execute():Promise<Paciente[]>{
        return this.PacienteRepository.listar();
    }
}