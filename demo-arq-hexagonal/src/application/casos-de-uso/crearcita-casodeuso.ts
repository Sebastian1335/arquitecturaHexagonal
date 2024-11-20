import { Cita } from "src/domain/entidades/cita.entity";
import { CitaRepositoryPuerto } from "src/domain/puertos/cita-repository-puerto";

export class CrearCitaCasoDeUso{
    constructor(private readonly citaRepository: CitaRepositoryPuerto){}
    async execute(pacienteNombre: string, doctorNombre: string, date: Date): Promise<Cita>{
        const cita = new Cita(
            Date.now().toString(), 
            pacienteNombre, 
            doctorNombre,
            date);
        return await this.citaRepository.create(cita);
    }
}


