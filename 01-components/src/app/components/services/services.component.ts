import {
  Component,
  Inject,
  InjectionToken,
  Self,
  SkipSelf,
} from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { LoggerService } from '../../logger.service';
import { API_URL } from '../../app.module';
import { RandomService } from '../../random.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  providers: [RandomService],
  viewProviders: [],
})
export class ServicesComponent {
  products: Product[] | any;

  // dependency injection - injection of productService in constructor
  constructor(
    @Inject('PRODUCT_SERVICE') private productService: ProductService,
    @Inject(API_URL) private URL: string,
    @SkipSelf() private randomService: RandomService
  ) {
    // this.productService = new ProductService();
  }

  getProducts() {
    console.log(this.URL);
    console.log(`Service Component - ${this.randomService.randomValue}`);

    this.products = this.productService.getProducts();
  }
}
