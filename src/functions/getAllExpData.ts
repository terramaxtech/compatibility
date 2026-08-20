import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as dotenv from "dotenv";
import { fetchExperiments } from "./fetchData/fetchExperiments";
import { fetchExpAuthors } from "./fetchData/fetchExpAuthors";
import { fetchExpUnits } from "./fetchData/fetchExpUnits";
import { fetchUnitInternals } from "./fetchData/fetchUnitInternals";
import { fetchAuthors } from "./fetchData/fetchAuthors";
import { fetchClients } from "./fetchData/fetchClients";
import { fetchComponents } from "./fetchData/fetchComponents";
import { fetchExternals } from "./fetchData/fetchExternals";
import { fetchGivenExternalTypes } from "./fetchData/fetchGivenExternalTypes";
import { fetchInternals } from "./fetchData/fetchInternals";
import { fetchManufacturers } from "./fetchData/fetchManufacturers";
import { fetchMicrobeFamilies } from "./fetchData/fetchMicrobeFamilies";
import { fetchSimpleExternalTypes } from "./fetchData/fetchSimpleExternalTypes";
import { fetchUnitClients } from "./fetchData/fetchUnitClients";
import { fetchUnitExternals } from "./fetchData/fetchUnitExternals";
import { fetchUnitExternalsComponents } from "./fetchData/fetchUnitExternalsComponents";
import { fetchUnitExternalsManufacturers } from "./fetchData/fetchUnitExternalsManufacturers";
import { composeExperiments } from "./composers/composeExperiments";

export async function getAllExperimentData(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const result = dotenv.config();
    const parsedResult = result.parsed;
    try {
        
        context.log(result, process.env.AZURE_FUNCTIONS_ENVIRONMENT);

        const allAuthors = await fetchAuthors(context);
        const allClients = await fetchClients(context);
        const allComponents = await fetchComponents(context);
        const allExternals = await fetchExternals(context);
        const allGivenExternalTypes = await fetchGivenExternalTypes(context);
        const allSimpleExternalTypes = await fetchSimpleExternalTypes(context);
        const allInternals = await fetchInternals(context);
        const allManufactureres = await fetchManufacturers(context);
        const allMicrobeFamilies = await fetchMicrobeFamilies(context);

        const allExperiments = await composeExperiments(context);

        
        // const allExperiments = await fetchExperiments(context);
        // const allExpAuthors = await fetchExpAuthors(context);
        // const allExpUnits = await fetchExpUnits(context);
        // const allUnitClients = await fetchUnitClients(context);
        // const allUnitExternals = await fetchUnitExternals(context);
        // const allUnitExternalsComponents = await fetchUnitExternalsComponents(context);
        // const allUnitExternalManufacturers = await fetchUnitExternalsManufacturers(context);
        // const allUnitInternals = await fetchUnitInternals(context);

        return {
            status: 200,
            body: JSON.stringify({
                authors: allAuthors,
                clients: allClients,
                components: allComponents,
                externals: allExternals,
                givenExternalTypes: allGivenExternalTypes,
                internals: allInternals,
                manufacturers: allManufactureres,
                microbeFamilies: allMicrobeFamilies,
                simpleExternalFamilies: allSimpleExternalTypes,
                experiments: allExperiments
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }

    } catch (err) {
        const errorBody = err instanceof Error ? err.message : "unknown error";
        context.log("Error:", errorBody);
        return {
            status: 400,
            body: JSON.stringify({
                "error": errorBody,
                "isError": err instanceof Error,
                "message": err instanceof Error ? err.message : null,
                "name": err instanceof Error ? err.name : null,
                "stack": err instanceof Error ? err.stack : null,
                "raw": String(err),
                "configResult": parsedResult,
                "AZURE_FUNCTIONS_ENVIRONMENT": process.env.AZURE_FUNCTIONS_ENVIRONMENT ?? "undefined"
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }
    }
}

app.http('AllExperimentData', {
    methods: ['GET'],
    authLevel: "anonymous",
    handler: getAllExperimentData
});