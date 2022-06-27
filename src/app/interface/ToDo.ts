import { Status } from "../enum/status";

export interface ToDo {
    id: number,
    name: string,
    description: string,
    status: Status,
    dateOfCreation: Date,
    toDoDate: Date,
}