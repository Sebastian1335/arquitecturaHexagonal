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
    async create(@Body() body: {pacienteNombre: string; doctorNombre: string; date: string}){
        const {pacienteNombre, doctorNombre, date} = body;
        return await this.crearCitaCasoDeUso.execute(pacienteNombre,doctorNombre,new Date(date));
    }

    @Get()
    async findAll(){
        return await this.listarCitaCasoDeUso.execute();
    }


}

