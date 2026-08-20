import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { UnitExternal } from "../dataModels/externals";

export async function fetchUnitExternals(context: InvocationContext): Promise<UnitExternal[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT code, external_name, unit_num, simple_type_name, given_type_name, application_rate
            FROM unit_externals`;
        const data: UnitExternal[] = result.recordset as UnitExternal[];

        return data;

    } catch (err) {
        context.log("fetchUnitExternals error:", err);
        throw err;
    }
}