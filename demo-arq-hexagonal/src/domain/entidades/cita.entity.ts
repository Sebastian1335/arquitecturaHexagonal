export class Cita{
    constructor(
        public id: string,
        public pacienteNombre: string,
        public doctorNombre: string,
        public date: Date,
    ){}
}