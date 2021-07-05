import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res} from '@nestjs/common';
import {CoursesService} from './courses.service';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {
    }

    @Get()
    findAll(@Res() response) {
        return response.status(200).json(this.coursesService.findAll());
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.coursesService.findById(id);
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
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
        return this.coursesService.delete(id);
    }
}
