import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { UnitInternals } from "../dataModels/unit";

export async function fetchUnitInternals(context: InvocationContext): Promise<UnitInternals[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const internalsResult = await sql.query`SELECT code, internal_name, unit_num, application_rate
            FROM unit_internals`;
        const internalsData: UnitInternals[] = internalsResult.recordset as UnitInternals[];

        return internalsData;

    } catch (err) {
        context.log("fetchUnitInternals error:", err);
        throw err;
    }
}