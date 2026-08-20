import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import {  } from "../dataModels/unit";
import { UnitExternalsComponent } from "../dataModels/externals";

export async function fetchUnitExternalsComponents(context: InvocationContext): Promise<UnitExternalsComponent[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT id, unit_external_code, component_name, min_percent, max_percent, other_qty
            FROM unit_externals_components`;
        const data: UnitExternalsComponent[] = result.recordset as UnitExternalsComponent[];

        return data;

    } catch (err) {
        context.log("fetchUnitExternalsComponents error:", err);
        throw err;
    }
}