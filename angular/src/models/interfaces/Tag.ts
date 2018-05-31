export interface Note {
    PK?: number,
    tag: string,
}

export function createInitilaTag(): Note {
    return { tag: ''}
}