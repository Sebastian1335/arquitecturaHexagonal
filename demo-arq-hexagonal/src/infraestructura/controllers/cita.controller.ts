import {Controller, Get, Post, Body} from '@nestjs/common';
import { CrearCitaCasoDeUso } from 'src/application/casos-de-uso/crearcita-casodeuso';
import { ListarCitaCasoDeUso } from 'src/application/casos-de-uso/listarcitas-casodeuso';
@Controller('citas')
export class CitaController{
    constructor(
        private readonly crearCitaCasoDeUso: CrearCitaCasoDeUso,
        private readonly listarCitaCasoDeUso: ListarCitaCasoDeUso,
    ){}

    @Post()
    async create(@Body() body: {id: number, pacienteId: number; doctorId:  number; date: string}){
        const {id, pacienteId, doctorId, date} = body;
        return await this.crearCitaCasoDeUso.execute(id,pacienteId,doctorId,new Date(date));
    }

    @Get()
    async findAll(){
        return await this.listarCitaCasoDeUso.execute();
    }


}

