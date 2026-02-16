import { parse } from 'csv-parse/sync';
export type UserProfile = {
        id: number;
        lastLogin: Date;
        balance: number;
    }
    

export function readResponse(response:string): UserProfile[]
{
    try
    {
        
        const responseString = JSON.parse(response);
        
         return responseString.map(extractUser)
    }
    catch(error)
    {
        throw new Error("Failed to parse API response");
    }
}

function extractUser (response:any): UserProfile
{
    return {
        id: Number(response.id),
        lastLogin: new Date(response.lastLogin),
        balance: parseFloat(response.balance)
    };
}


export function loadCSV<T>(fileContent:string): T[]
{
    
     return parse(fileContent, {columns:true});
}
