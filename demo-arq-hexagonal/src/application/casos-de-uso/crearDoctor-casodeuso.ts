import { Doctor } from "src/domain/entidades/doctor.entity";
import { DoctorRepositoryPuerto } from "src/domain/puertos/doctor-repository-puerto";

export class CrearDoctorCasoDeUso{
    constructor(
        private readonly doctorRepository: DoctorRepositoryPuerto,
    ){}

    async execute(doctor: Doctor): Promise<Doctor>{
        return this.doctorRepository.crear(doctor);
    }
}