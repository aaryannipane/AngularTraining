import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public products?: Product[];

  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.products = this._activatedRoute.snapshot.data['products'];
    console.log(this.products);
    
  }
}
