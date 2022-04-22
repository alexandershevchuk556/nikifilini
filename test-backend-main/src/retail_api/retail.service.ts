import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter,  OrderStatus, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'
import { exit } from 'process'
import qs from 'qs'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {
        'X-API-KEY': `${process.env.RETAIL_KEY}`
       },
    })

    this.axios.interceptors.request.use((config) => {
      // console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        // console.log("Result:", r.data)
        return r
      },
      (r) => {
        // console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const params = serialize(filter, '');
    const resp = await this.axios.get('/orders?' + params);

    if (!resp.data) throw new Error('RETAIL CRM ERROR');

    const orders = plainToClass(Order, resp.data.orders as Array<any>);
    const pagination: RetailPagination = resp.data.pagination;

    return [orders, pagination];
  }

  async findOrder(id: string): Promise<Order | null> {
    console.log(id);
    const resp = await this.axios.get('/orders?' + id);

    if (!resp.data) throw new Error('RETAIL CRM ERROR');

    const orders = plainToClass(Order, resp.data.orders as Array<any>);
    
    return orders[0];
  }

  async ordersStatuses(params?: {ids?: number[], externalIds?: number[]}): Promise<[OrderStatus[], RetailPagination]> {


    /*
    * Я думал что это тоже нужно сделать но после прочтения задачи по фронту понял что делать нужно
    * только поиск заказов. Лучше это сразу указывать для бэка.
    */

    // const resp = await this.axios.get('/orders/statuses', {
    //   params: params,
    //   paramsSerializer: params => {
    //     return qs.stringify(params);
    //   }
    // })

    // console.log(resp);

    // if (!resp.data) throw new Error('RETAIL CRM ERROR');

    // const statuses = plainToClass(OrderStatus, resp.data.orders as Array<any>);
    // const pagination: RetailPagination = resp.data.pagination;
    // return [statuses, pagination];
    return;
  }

  async productStatuses(): Promise<CrmType[]> {
    return;
  }

  async deliveryTypes(): Promise<CrmType[]> {
    return;
  }
}
