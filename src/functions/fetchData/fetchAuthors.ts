import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { Author } from "../dataModels/listItems";

export async function fetchAuthors(context:InvocationContext): Promise<Author[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT code, first_name, last_name
            FROM authors`;
        const data: Author[] = result.recordset as Author[];

        return data;

    } catch (err) {
        context.log("fetchAuthors error:", err);
        throw err;
    }
}