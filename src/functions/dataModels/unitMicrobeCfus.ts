export type UnitMicrobeCfus = {
    id: number,
    unit_num: string,
    microbe_name: string,
    timepoint_hrs: number,
    cfu: number | undefined,
    less_than: string | undefined
}