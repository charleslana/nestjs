import {Body, Controller, Get, Param, Post} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    findAll() {
        return 'List of courses';
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return `Course #${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }
}
