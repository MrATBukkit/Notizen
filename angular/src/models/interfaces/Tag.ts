export interface Tag {
    PK?: number,
    tag: string,
}

export function createInitilaTag(): Tag {
    return { tag: '' }
}