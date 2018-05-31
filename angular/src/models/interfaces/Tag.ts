export interface Note {
    PK?: number,
    tag: string,
}

export function createInitilaNote(): Note {
    return { tag: ''}
}