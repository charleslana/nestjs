import {Injectable, NotFoundException} from '@nestjs/common';
import {Course} from './entities/course.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {Tag} from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    ) {
    }

    findAll(): Promise<Course[]> {
        return this.courseRepository.find({
            relations: ['tags'],
        });
    }

    async findById(id: string): Promise<Course> {
        const courseExists = await this.courseRepository.findOne(id, {
            relations: ['tags'],
        });

        if (!courseExists) {
            throw new NotFoundException(`Course ID ${id} not found.`);
        }

        return courseExists;
    }

    async create(createCourseDto: CreateCourseDto): Promise<CreateCourseDto> {
        const tags = await Promise.all(
            createCourseDto.tags.map((name: any) => this.preloadTagByName(name)),
        );

        const course = this.courseRepository.create({
            ...createCourseDto,
            tags,
        });

        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto): Promise<UpdateCourseDto> {
        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
            )
        );

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags,
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

    private async preloadTagByName(name: string): Promise<any> {
        const tag = await this.tagRepository.findOne({name});

        if (tag) {
            return tag;
        }

        return this.tagRepository.create({name});
    }
}
