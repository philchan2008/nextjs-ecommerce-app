// lib/envConfig.ts
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

console.log(process.env.NEXT_PUBLIC_API_BASE); // safely loaded
console.log(process.env.DB_URI); // safely loaded
