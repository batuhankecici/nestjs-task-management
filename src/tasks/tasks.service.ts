import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task,TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import xlsx from 'node-xlsx';
import { range } from 'rxjs';

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
        const found = this.tasks.find((task)=> task.id ===id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }
    deleteTask(id:string):void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
    
    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto):Task[]{
        const {status,search} = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }

        if(search){
            tasks = tasks.filter((task)=>{
                if (task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false;
            });
        }
        return tasks;
    }
    exportExcel():Buffer{
        const tasks = this.getAllTasks();
        const headers = ["ID","TITLE","DESCRİPTİON","STATUS"]
        const data = [
            headers
          ];
          tasks.forEach(element => {
              var arr = [];
              arr.push(element.id,element.title,element.description,element.status);
              data.push(arr);
          });
          console.log(data);
          var buffer = xlsx.build([{name: 'mySheetName', data: data,options:null}]); 
          return buffer;
    }

}
