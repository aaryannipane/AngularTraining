import { Component, Inject } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { LoggerService } from '../../logger.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  providers: [],
})
export class ServicesComponent {
  products: Product[] | any;

  // dependency injection - injection of productService in constructor
  constructor(@Inject('PRODUCT_SERVICE') private productService: ProductService) {
    // this.productService = new ProductService();
  }

  getProducts() {
    this.products = this.productService.getProducts();
  }
}
