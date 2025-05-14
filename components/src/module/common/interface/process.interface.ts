import { UUIDTypes } from "uuid"

export interface Process {
    id: UUIDTypes
    name: string,
    description: string
    status: boolean
}