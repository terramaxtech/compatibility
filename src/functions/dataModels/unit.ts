import { ComposedUnitExternal } from "./externals"
import { SimpleListItem } from "./listItems"

export type ExpUnit = {
    id: number,
    exp_num: string,
    unit_num: string
}

export type UnitClient = {
    id: number,
    unit_num: string,
    client_name: string
}

export type UnitInternals = {
    code: string, 
    internal_name: string,
    unit_num: string,
    applicaiton_rate: string | undefined
}

export type composedUnit = {
    unit: ExpUnit,
    clients: string[],
    internals: UnitInternals[],
    externals: ComposedUnitExternal[]
}