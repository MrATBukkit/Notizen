import {Tag} from "./Tag";

export interface Note {
    PK?: number,
    text: string,
    tags?: Tag[],
}

export function createInitilaNote(): Note {
    return { text: ''}
}