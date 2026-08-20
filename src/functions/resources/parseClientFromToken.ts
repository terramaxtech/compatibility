import { HttpRequest, InvocationContext } from "@azure/functions";
import { jwtDecode } from "jwt-decode"
import * as dotenv from 'dotenv';

export type ClientInfo = {
    email: string,
    name: string,
    role: string
}

export type UserRole = "Sales" | "Lab";

function defineRole(clientEmail: string, context: InvocationContext): UserRole {
    dotenv.config();
    const labUsers = process.env.LAB_USERS; //.split(';');
    context.log("labUsers:", labUsers);

    if(labUsers.includes(clientEmail)) return "Lab"
    else return "Sales";
}

export function ParseClientFromToken(request: HttpRequest, context: InvocationContext): ClientInfo | undefined {
    
    const authHeader = request.headers.get("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        // const errorMessage: string = `parseClientFromToken Error: no authHeaders provided`;
        // context.log(errorMessage);
        // throw new Error(errorMessage);

        return undefined;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwtDecode(token);

        // Extract details
        const thisClient: ClientInfo = {
            email: decodedToken["upn"],
            name: decodedToken["name"],
            role: defineRole(decodedToken["upn"], context)
        }

        return thisClient;

    } catch (err) {
        context.log("parseClientFromToken error:", err);
        throw err;
    }
}