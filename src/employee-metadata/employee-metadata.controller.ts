import { Controller, Get, Post } from '@nestjs/common';

@Controller('employee/metadata')
export class EmployeeMetadataController {

    @Post()
    async create() {
        return 'create and store metadata object'
    }

    @Get()
    async listAll(){
        return 'list all metadata objects'
    }
}
