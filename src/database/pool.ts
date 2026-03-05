import { Pool } from "pg";

const cache: Record<string, Pool> = {};

export function getPool(connectionString: string): Pool {

  if (!cache[connectionString]) {
    cache[connectionString] = new Pool({
      connectionString
    });
  }

  return cache[connectionString];
}