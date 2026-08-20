import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ClientInfo, ParseClientFromToken } from "./resources/parseClientFromToken";


export async function getClientInfo(request:HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const client: ClientInfo = await ParseClientFromToken(request, context);

        if(!client) {
            return {
                status: 401,
                body: JSON.stringify("UnauthorizedL valid token not provided"),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        } 

        return {
            status: 200,
            body: JSON.stringify({
                "client": client
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }

    } catch (err) {
        context.log("getUser error:", err);

        return {
            status: 500,
            body: JSON.stringify(err),
            headers: {
                'Content-type': 'application/json'
            }
        }
    }
}

app.http('Client', {
    methods: ['GET'],
    authLevel: "anonymous",
    handler: getClientInfo
});