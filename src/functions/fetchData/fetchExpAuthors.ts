import { InvocationContext } from "@azure/functions";
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { ExpAuthor } from "../dataModels/listItems";

export async function fetchExpAuthors(context: InvocationContext): Promise<ExpAuthor[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT 
            exp_authors.id as id, exp_authors.author_code as author_code, exp_authors.exp_num as exp_num,
            authors.first_name as first_name, authors.last_name as last_name 
            FROM exp_authors inner join authors on exp_authors.author_code = authors.code`;
        const data: ExpAuthor[] = result.recordset as ExpAuthor[];

        return data;

    } catch (err) {
        context.log("fetchExpAuthors error:", err);
        throw err;
    }
}