import {Injectable} from '@nestjs/common';
import {Course} from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Course NestJs',
            description: 'Course NestJs description',
            tags: [
                'node.js',
                'nestjs',
                'javascript'
            ]
        }
    ];

    findAll(): Course[] {
        return this.courses;
    }

    findById(id: string): Course {
        return this.courses.find((course: Course) => course.id === Number(id));
    }

    create(createCourseDto: any): any {
        this.courses.push(createCourseDto);
    }

    update(id: string, updateCourseDto: any): any {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));
        this.courses[indexCourse] = updateCourseDto;
    }

    delete(id: string): any {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));

        if (indexCourse >= 0) {
            this.courses.splice(indexCourse, 1);
        }
    }
}
