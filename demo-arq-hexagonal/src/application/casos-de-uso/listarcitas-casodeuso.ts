import { Cita } from "src/domain/entidades/cita.entity";
import { CitaRepositoryPuerto } from "src/domain/puertos/cita-repository-puerto";

export class ListarCitaCasoDeUso{
    constructor(private readonly CitaRepository: CitaRepositoryPuerto){} //inyección de dependencia

    async execute(): Promise<Cita[]>{
        return await this.CitaRepository.findAll();
    }

}



