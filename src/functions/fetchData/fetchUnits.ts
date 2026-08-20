import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";

export async function fetchUnits(context:InvocationContext) {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT num
            FROM units`;
        const data = result.recordset as any[];

        return data;

    } catch (err) {
        context.log("fetchUnits error:", err);
        throw err;
    }
}