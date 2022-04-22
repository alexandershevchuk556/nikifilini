import { Controller, Get, Param, Req } from '@nestjs/common'
import { stringify } from 'querystring';
import { AppService } from './app.service'
import { RetailService } from './retail_api/retail.service'
import { Order, OrderStatus, RetailPagination } from './retail_api/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly retailService: RetailService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/orders')
  getOrders(): Promise<[Order[], RetailPagination]> {
    return this.retailService.orders();
  }

  @Get('/order/:id')
  findOrderById(@Param('id') id: string): Promise<Order | null> {
    console.log(id);
    return this.retailService.findOrder(id);
  }

  // @Get('/status?:params')
  // getOrdersStatuses(@Param() params: string): Promise<[OrderStatus[], RetailPagination]> {
  //   console.log(params);
  //   // return this.retailService.ordersStatuses(params);
  //   return;
  // }
}
