import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { UnitExternalsManufacturer } from "../dataModels/externals";

export async function fetchUnitExternalsManufacturers(context: InvocationContext): Promise<UnitExternalsManufacturer[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT id, unit_external_code, manufacturer_name
            FROM unit_externals_manufacturers`;
        const data: UnitExternalsManufacturer[] = result.recordset as UnitExternalsManufacturer[];

        return data;

    } catch (err) {
        context.log("fetchUnitExternalsManufacturers error:", err);
        throw err;
    }
}