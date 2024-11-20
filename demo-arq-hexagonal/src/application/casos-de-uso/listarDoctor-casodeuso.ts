import { Doctor } from "src/domain/entidades/doctor.entity";
import { DoctorRepositoryPuerto } from "src/domain/puertos/doctor-repository-puerto";

export class ListarDoctorCasoDeUso{
    constructor(
        private readonly DoctorRepository: DoctorRepositoryPuerto,
    ){}

    async execute(): Promise<Doctor[]>{
        return this.DoctorRepository.listar();
    }
}