import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    findAll(@Res() response) {
        return response.status(200).send('List of courses');
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return `Course #${id}`;
    }

    @Post()
    create(@Body() body: any) {
        return body;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        return null;
    }
}
