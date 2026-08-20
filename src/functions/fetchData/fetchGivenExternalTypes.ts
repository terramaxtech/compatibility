import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { SimpleListItem } from "../dataModels/listItems";

export async function fetchGivenExternalTypes(context:InvocationContext): Promise<SimpleListItem[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT name
            FROM given_external_types`;
        const data: SimpleListItem[] = result.recordset as SimpleListItem[];

        return data;

    } catch (err) {
        context.log("fetchGivenExternalTypes error:", err);
        throw err;
    }
}