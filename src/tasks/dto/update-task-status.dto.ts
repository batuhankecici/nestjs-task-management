import { IsEnum } from "class-validator";
import { Task, TaskStatus } from "../task.model";

export class UpdateTaskStatusDto{
    @IsEnum(TaskStatus)
    status: TaskStatus;
}