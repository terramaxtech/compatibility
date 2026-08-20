import { InvocationContext, } from "@azure/functions";
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { Experiment } from "../dataModels/experiment";

export async function fetchExperiments(context: InvocationContext): Promise<Experiment[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT num, start_date, notebook, notes 
            FROM experiments`;
        const data: Experiment[] = result.recordset as Experiment[];

        return data;

    } catch (err) {
        context.log("fetchExperiments error:", err);
        throw err;
    }
}