export interface Note {
    PK?: number,
    text: string,
    tags?: number[],
}

export function createInitilaNote(): Note {
    return { text: ''}
}