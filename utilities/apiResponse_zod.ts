import {z, ZodType} from "zod";
import { parse } from 'csv-parse/sync';

export const UserProfileSchenma = z.object({
        id: z.coerce.number(),
        lastLogin: z.iso.datetime(),
        balance: z.coerce.number(),
    })


export const UserProfilesSchema = z.array(UserProfileSchenma)

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

export function loadCSVZod<S extends ZodType>(fileContent:string, schema:S):z.output<S>[]
{
    
     return z.array(schema).parse(parse(fileContent, {columns:true}));
   
}
