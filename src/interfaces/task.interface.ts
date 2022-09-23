export interface Task {
    name: string,
    description: string,
}

export interface TaskCreated extends Task {
    _id: string,
    created_at: Date,
    updated_at: Date
}