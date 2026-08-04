import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as dotenv from "dotenv";
import { fetchExperiments } from "../functions/fetchData/fetchExperiments";

export async function getAllExperimentData(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const result = dotenv.config();
    try {
        
        context.log(result, process.env.AZURE_FUNCTIONS_ENVIRONMENT);

        const allExperiments = await fetchExperiments(context);

        return {
            status: 200,
            body: JSON.stringify(allExperiments),
            headers: {
                'Content-type': 'application/json'
            }
        }

    } catch (err) {
        const errorBody = err instanceof Error ? err.message : "unknown error";
        context.log("Error:", errorBody, "config result:", result);
        return {
            status: 400,
            body: JSON.stringify({
                "error": errorBody,
                "AZURE_FUNCTIONS_ENVIRONMENT": process.env.AZURE_FUNCTIONS_ENVIRONMENT
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