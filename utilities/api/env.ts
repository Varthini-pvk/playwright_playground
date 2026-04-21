import dotenv from 'dotenv';
import path from 'path';

const test_env = process.env.TestEnv || 'qa';
const envfile = path.resolve(process.cwd(), `config/api/.env.${test_env}`)
dotenv.config({path: envfile});

export const isDebug = getEnvDetails('debugFlag')=='true';
export const api_key = getEnvDetails('test_key');

function getEnvDetails(varName: string)
{

  const value = process.env[varName]
  if (!value)
  {
      throw new Error(`Missing environment variable: ${varName}`);
  }
  return value;
}
