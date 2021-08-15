export enum SitStatus{
    FREE = "FREE",
    TAKEN = "TAKEN",
    SELECTED = "SELECTED"
}

export interface Sit{
    id: number,
    row: number,
    index?: number, //zakładamy, że dane będą posortowane po id
    status: SitStatus
}
