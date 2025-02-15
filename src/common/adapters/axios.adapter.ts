import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../types/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    const resp = await this.axios.get<T>(url);
    return resp.data;
  }
}
