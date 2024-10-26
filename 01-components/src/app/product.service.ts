import { Inject, Injectable } from '@angular/core';
import { Product } from './product.model';
import { LoggerService } from './logger.service';
import { delay, Observable, of } from 'rxjs';

// when we want to insert dependency in any service we have to decorate it with injectable
@Injectable()
export class ProductService {
  constructor(private logger: LoggerService) {
    logger.log('logger initialized');
  }
  public getProducts(): Observable<Product[]> {
    this.logger.log('product get called');

    let products: Product[];
    products = [
      new Product(1, 'Memory Card', 500),
      new Product(2, 'Pen Drive', 750),
      new Product(3, 'Power Bank', 100),
    ];

    return of(products).pipe(delay(1500));
  }
}
