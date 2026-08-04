import { InvocationContext } from "@azure/functions";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from 'dotenv';

export type SqlConfig = {
    server: string,
    database: string,
    authentication: {
        type: string,
    } | {
        type: string,
        options: {
            credentials: DefaultAzureCredential
        }
    },
    options: {encrypt: boolean}
}

export function getSqlConfig(context: InvocationContext): SqlConfig {

    try {
        dotenv.config();
        const credential = new DefaultAzureCredential();
        const isLocal = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Development';
        const sqlConfig: SqlConfig = {
            server: process.env.AZURE_SQL_SERVER,
            database: process.env.AZURE_SQL_DATABASE,
            authentication: isLocal
                ? {
                    type: "azure-active-directory-default",
                    options: {
                        credentials: credential
                    }
                }
                : {
                    type: "azure-active-directory-msi-app-service"
                },
            options: { encrypt: true }
        };

        context.log(`AZURE_FUNCTIONS_ENVIRONMENT: ${process.env.AZURE_FUNCTIONS_ENVIRONMENT}, using ${isLocal ? "az cli auth" : "managed identity auth"}...`);

        return sqlConfig
    } catch (err) {
        const errorBody = err instanceof Error ? err.message : "unknown error";
        context.log("Error:", errorBody);
        throw new Error(`getSqlCOnfig error: ${errorBody}`);
    }
}