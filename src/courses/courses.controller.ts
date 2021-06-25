import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res} from '@nestjs/common';

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

    @Put()
    update(@Body() body: any) {
        return body;
    }

    @Patch(':id')
    updateName(@Param('id') id: string, @Body('name') name: string) {
        return {
            id,
            name
        }
    }

    @Get('stage/student')
    findStudentById(@Query('id') id: number) {
        return id;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        return null;
    }
}
