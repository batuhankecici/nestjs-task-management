import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task,TaskStatus } from './task.model';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const {id,title,description} = createTaskDto;
        const task: Task ={
            id,
            title,
            description,
            status: TaskStatus.OPEN,

        }
        this.tasks.push(task);
        return task;
    }
    getTaskById(id:string):Task{
        return this.tasks.find((task)=> task.id ===id);
    }
    deleteTask(id:string):void{
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
    
    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
