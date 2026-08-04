import { InvocationContext, } from "@azure/functions";
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";

export async function fetchExperiments(context: InvocationContext): Promise<[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const experimentsResult = await sql.query`SELECT * FROM experiments`;
        const experimentsData = experimentsResult.recordset as [];

        return experimentsData;

    } catch (err) {
        const errorBody: string = err instanceof Error ? err.message : "unknown error";
        context.log(errorBody);
        throw new Error(errorBody);       
    }
}