import type { Process } from "../../common/interface/process.interface";
import type { Team } from "../../common/interface/team.interface";
import { AccessLevel } from "./access-level.enum";

export interface Client {
    username: string,
    access_level: AccessLevel,
    teams?: Team[],
    process?: Process[]
}