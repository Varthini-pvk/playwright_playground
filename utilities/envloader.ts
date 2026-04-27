import dotenv from 'dotenv';
import path from 'path';

export function loadenv(envFilePath:string){

    const test_env = process.env.TestEnv || 'qa';
    const envfile = path.resolve(process.cwd(), `config/${envFilePath}/.env.${test_env}`)
    dotenv.config({path: envfile});
}

export function getEnvDetails(varName: string)
{

  const value = process.env[varName]
  if (!value)
  {
      throw new Error(`Missing environment variable: ${varName}`);
  }
  return value;
}
