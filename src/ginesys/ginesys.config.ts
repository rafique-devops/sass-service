import { registerAs } from '@nestjs/config';

export default registerAs('ginesys', () => ({
  baseUrl: process.env.GINESYS_ITEM_API_URL,
  authToken: process.env.GINESYS_AUTH_TOKEN,
}));
