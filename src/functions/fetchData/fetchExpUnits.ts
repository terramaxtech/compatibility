import { InvocationContext } from "@azure/functions"
import { getSqlConfig } from "../resources/getSqlConfig";
import * as sql from "mssql";
import { ExpUnit } from "../dataModels/unit";

export async function fetchExpUnits(context: InvocationContext): Promise<ExpUnit[]> {
    try {
        const sqlConfig = getSqlConfig(context);

        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT 
            exp_units.id as id, exp_units.exp_num, units.num as unit_num 
            FROM units inner join exp_units on units.num = exp_units.unit_num`;
        const data: ExpUnit[] = result.recordset as ExpUnit[];

        return data;

    } catch (err) {
        context.log("fetchExpUnits error:", err);
        throw err;
    }
}