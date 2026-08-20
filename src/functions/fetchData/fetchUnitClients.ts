import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { UnitClient } from "../dataModels/unit";

export async function fetchUnitClients(context: InvocationContext): Promise<UnitClient[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT id, unit_num, client_name
            FROM unit_clients`;
        const data: UnitClient[] = result.recordset as UnitClient[];

        return data;

    } catch (err) {
        context.log("fetchUnitClients error:", err);
        throw err;
    }
}