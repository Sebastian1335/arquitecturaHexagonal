import { NotFoundException } from "@nestjs/common";
import { Cita } from "src/domain/entidades/cita.entity";
import { CitaRepositoryPuerto } from "src/domain/puertos/cita-repository-puerto";
import { DoctorRepositoryPuerto } from "src/domain/puertos/doctor-repository-puerto";
import { PacienteRepositoryPuerto } from "src/domain/puertos/paciente-repository-puerto";

export class CrearCitaCasoDeUso{
    constructor(
        private readonly citaRepository: CitaRepositoryPuerto,
        private readonly pacienteRepository: PacienteRepositoryPuerto,
        private readonly doctorRepository: DoctorRepositoryPuerto
    ){}
    async execute(id: number, pacienteID: number, doctorId: number, date: Date): Promise<Cita>{
        const cita = new Cita(
            id, 
            pacienteID, 
            doctorId,
            date);

        const pacienteExiste = await this.pacienteRepository.existe(pacienteID)
        if (!pacienteExiste) {
            throw new NotFoundException(`El paciente con ID ${pacienteID} no existe.`);
        }

        const doctorExiste = await this.doctorRepository.existe(doctorId);
        if (!doctorExiste) {
            throw new NotFoundException(`El doctor con ID ${doctorId} no existe.`);
        }


        return await this.citaRepository.create(cita);
    }
}


