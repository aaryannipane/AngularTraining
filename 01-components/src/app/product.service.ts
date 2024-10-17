import { Inject, Injectable } from '@angular/core';
import { Product } from './product.model';
import { LoggerService } from './logger.service';

// when we want to insert dependency in any service we have to decorate it with injectable
@Injectable()
export class ProductService {
  constructor(private logger: LoggerService) {
    logger.log('logger initialised');
  }
  public getProducts(): Product[] {
    this.logger.log('product get called');

    let products: Product[];
    products = [
      new Product(1, 'Memory Card', 500),
      new Product(2, 'Pen Drive', 750),
      new Product(3, 'Power Bank', 100),
    ];

    return products;
  }
}
