export interface addNote {
    text: string,
    tags?: number[],
}

export function createInitilaAddNote(): addNote {
    return { text: ''}
}