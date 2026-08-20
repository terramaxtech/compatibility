import { SimpleListItem } from "./listItems"

export type UnitExternal = {
    code: string,
    external_name: string,
    unit_num: string,
    simple_type_name: string,
    given_type_name: string,
    application_rate: string | undefined
}

export type UnitExternalsComponent = {
    id: number,
    component_name: string,
    unit_external_code: string,
    min_percent: number | undefined,
    max_percent: number | undefined,
    other_qty: string | undefined
}

export type UnitExternalsManufacturer = {
    id: number,
    unit_external_code: string,
    manufacturer_name: string
}

export type UnitExternalComponent = {
    id: number,
    component_name: string,
    unit_external_code: string,
    min_percent: number | undefined,
    max_percent: number | undefined,
    other_qty: string | undefined
}

export type ComposedUnitExternal = {
    unit_external: UnitExternal,
    manufacturers: string[],
    components: UnitExternalComponent[]
}
