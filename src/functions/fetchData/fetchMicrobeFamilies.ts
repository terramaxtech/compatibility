import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { SimpleListItem } from "../dataModels/listItems";

export async function fetchMicrobeFamilies(context:InvocationContext): Promise<SimpleListItem[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT name
            FROM microbe_families`;
        const data: SimpleListItem[] = result.recordset as SimpleListItem[];

        return data;

    } catch (err) {
        context.log("fetchMicrobeFamilies error:", err);
        throw err;
    }
}