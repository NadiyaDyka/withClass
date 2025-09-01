import * as dotenv from 'dotenv';

dotenv.config({ path: '../.config/.env' });

export const CPURL = process.env.CPURL || '';
