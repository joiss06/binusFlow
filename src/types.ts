export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'To do' | 'In Progress' | 'Done';
    color: string;
}

export interface ColorOption {
    id: string;
    hexCode: string;
}