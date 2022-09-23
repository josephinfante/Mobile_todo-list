import { Task } from "./task.interface"

export interface User {
    _id: string,
    name: string,
    lastname: string,
    email: string,
}

export interface UserWithTasks extends User {
    tasks: Task[]
}