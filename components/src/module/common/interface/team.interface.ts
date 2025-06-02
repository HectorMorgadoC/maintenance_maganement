import { UUIDTypes } from "uuid"
import { Process } from "../../process/interface/process.interface"

export interface Team {
    id: UUIDTypes,
    name: string,
    status: boolean,
    process: Process
}