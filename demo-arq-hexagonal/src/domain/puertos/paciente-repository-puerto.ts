import { Paciente } from "../entidades/paciente.entity";

export interface PacienteRepositoryPuerto{
    crear(paciente: Paciente): Promise<Paciente>;
    listar(): Promise<Paciente[]>;
    existe(pacienteId: number): Promise<boolean>;
}