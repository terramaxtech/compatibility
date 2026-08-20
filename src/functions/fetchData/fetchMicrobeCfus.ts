import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { UnitMicrobeCfus } from "../dataModels/unitMicrobeCfus";

export async function fetchMicrobeCfus(context:InvocationContext): Promise<UnitMicrobeCfus[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT id, unit_num, microbe_name, timepoint_hrs, cfu, less_than
            FROM unit_microbe_cfus`;
        const data: UnitMicrobeCfus[] = result.recordset as UnitMicrobeCfus[];

        return data;

    } catch (err) {
        context.log("fetchInternals error:", err);
        throw err;
    }
}