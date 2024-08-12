export interface Task {
    id: string
    title: string
    desc: string
    created: any
    state: string
}

export interface EditingTask {
    title: string
    desc: string
}

export interface User {
    id: string
    email: string
    fullName: string
    created: any
}

export interface CreateUser {
    email: string
    fullName: string
}

export interface ApiResponse {
    status: string
    data: any
    desc: string
    timestamp: number
}