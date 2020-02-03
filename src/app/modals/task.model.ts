export class Task {
    id: string;
    title: string;
    description: string;
    priority: number;
    creationDate: string;
    status: number | string;
    constructor(data: {
        id?: string;
        title?: string;
        description?: string;
        priority?: number;
        creationDate?: string;
        status?: number | string
    } = {}) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.priority = data.priority;
        this.creationDate = data.creationDate;
        this.status = data.status;
    }
}
