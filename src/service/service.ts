import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

export async function getRandomImage(): Promise<AxiosResponse<string>> {
  return api.get('/randomImage');
}
