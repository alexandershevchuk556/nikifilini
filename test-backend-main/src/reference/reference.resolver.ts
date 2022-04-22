import { Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { DeliveryType, OrderStatus, ProductStatus } from '../graphql'
import { RetailPagination } from 'src/retail_api/types'

@Resolver('Reference')
export class ReferenceResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async deliveryTypes(): Promise<DeliveryType[]> {
    return this.retailService.deliveryTypes()
  }

  @Query()
  async productStatuses(): Promise<ProductStatus[]> {
    return this.retailService.productStatuses()
  }

  @Query()
  async ordersStatuses():Promise<[OrderStatus[], RetailPagination]> {
    return this.retailService.ordersStatuses()
  }
}
