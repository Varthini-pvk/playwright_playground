export class TemplateEngine {

     static replacePlaceholders(template:unknown, data:Record<string,unknown>): Record<string,unknown>
     {
        let payload = JSON.stringify(template);
        for(const [k,v] of Object.entries(data) )
        {
             payload =  payload.replaceAll(`{{${k}}}`, typeof v === "object" ? JSON.stringify(v): String(v));
        }
        return JSON.parse(payload)
     }
}