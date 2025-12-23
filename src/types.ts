export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    color: string;
}

export interface ColorOption {
    id: string;
    hexCode: string;
}