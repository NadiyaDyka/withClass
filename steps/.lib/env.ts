import * as dotenv from 'dotenv';

dotenv.config({ path: '../.config/.env' });

export const CPURL = process.env.CPURL || '';
export const CPPSWD = process.env.CPPSWD || '';
export const CPUSERPSWD = process.env.CPUSERPSWD || '';
export const CPUSER = process.env.CPUSER || '';
