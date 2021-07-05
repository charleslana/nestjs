import {Injectable, NotFoundException} from '@nestjs/common';
import {Course} from './entities/course.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(Course) private readonly courseRepository: Repository<Course>) {

    }

    findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    findById(id: string): Promise<Course> {
        const courseExists = this.courseRepository.findOne(id);

        if (!courseExists) {
            throw new NotFoundException(`Course ID ${id} not found.`);
        }

        return courseExists;
    }

    create(createCourseDto: CreateCourseDto): Promise<CreateCourseDto> {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto): Promise<UpdateCourseDto> {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
        });

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found.`);
        }

        return this.courseRepository.save(course);
    }

    async delete(id: string): Promise<any> {
        const course = await this.courseRepository.findOne(id);

        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found.`);
        }

        return this.courseRepository.remove(course);
    }
}
