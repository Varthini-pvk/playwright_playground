import {z, ZodTypeAny} from "zod";
import { parse } from 'csv-parse/sync';

const UserProfileSchenma = z.object({
        id: z.number(),
        lastLogin: z.iso.datetime().transform(d => new Date()),
        balance: z.coerce.number(),
    })


const UserProfilesSchema = z.array(UserProfileSchenma)

export type UserProfiles = z.infer<typeof UserProfilesSchema>
export type UserProfileZod = z.infer<typeof UserProfilesSchema>
    
    

export function readResponse_zod(response:string): UserProfiles
{
    try
    {
        
        return UserProfilesSchema.parse(JSON.parse(response));
    }
    catch(error)
    {
        throw new Error(`Failed to parse API response : ${error}`);
    }
}

export function loadCSVZod<S extends ZodTypeAny>(fileContent:string, schema:S): z.infer<S>[]
{
    
     return z.array(schema).parse(parse(fileContent, {columns:true}));
}

