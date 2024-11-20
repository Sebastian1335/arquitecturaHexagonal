export class Cita{
    constructor(
        public id: number,
        public pacienteID: number,
        public doctorID: number,
        public date: Date,
    ){}
}