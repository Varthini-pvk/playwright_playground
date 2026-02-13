import {z} from "zod";

const UserProfileSchenma = z.object({
        id: z.number(),
        lastLogin: z.iso.datetime().transform(d => new Date()),
        balance: z.coerce.number(),
    })


const UserProfilesSchema = z.array(UserProfileSchenma)

export type UserProfiles = z.infer<typeof UserProfilesSchema>
    

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

