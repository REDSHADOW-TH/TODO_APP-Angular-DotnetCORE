export interface AddNote {
    title: string;
    text: string;
    create_by: string;
}

export interface EditNote {
    id: number;
    title: string;
    text: string;
}

export interface Note {
    id: number;
    seq: number;
    title: string;
    textMessage: string;
    createBy: string;
}