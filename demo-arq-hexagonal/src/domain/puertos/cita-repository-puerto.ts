import { Cita } from "../entidades/cita.entity";

export interface CitaRepositoryPuerto{
    create(cita: Cita): Promise<Cita>;
    findAll():Promise<Cita[]>;
}
