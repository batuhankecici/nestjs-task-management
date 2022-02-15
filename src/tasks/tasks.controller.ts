import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Response } from 'express';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    @Get('/:id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string):Promise<void>{
        return this.tasksService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto:UpdateTaskStatusDto,
    ):Promise<Task>{
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status);
    }
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto);
    }
   /*
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        // if we have any filters defined, call tasksService.getTasksWithFilter otherwise, just get all tasks
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
        
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return this.tasksService.createTask(createTaskDto);
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.tasksService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string):void{
        return this.tasksService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body() updateTaskStatusDto:UpdateTaskStatusDto,
    ):Task{
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status);
    }
    @Get('/excel/export')
    exportExcel(@Res() res: Response){
        const buffer = this.tasksService.exportExcel()
        res.header('Content-disposition', 'attachment; filename=taskexport.xlsx');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buffer);
    }
    @Get('/csv/export')
    exportCsv(@Res() res:Response){
        const headers = ["ID","TITLE","DESCRİPTİON","STATUS"]
        const writeString = this.tasksService.exportCsv()
        res.header('Content-disposition', 'attachment; filename=tasks.csv');
        res.type('text/csv; charset=utf-8');
        return res.send(writeString);
    }
 */
}
