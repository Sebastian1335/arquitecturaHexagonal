import { Doctor } from "../entidades/doctor.entity";

export interface DoctorRepositoryPuerto{
    crear(doctor: Doctor): Promise<Doctor>;
    listar(): Promise<Doctor[]>;
    existe(doctorId: number): Promise<boolean>;
}