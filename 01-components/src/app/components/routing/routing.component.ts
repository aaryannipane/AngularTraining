import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.css',
})
export class RoutingComponent implements OnInit {
  id: string | null = '0';
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // using snapshot paramMap
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
    console.log(`init - ${this.id}`);

    // using snapshot param Array
    this.id = this._ActivatedRoute.snapshot.params['id'];

    // use subscribing approach when component is loaded and reused it will work fine as on init will not call again when component is used again one instance is created
    // by subscribing to observables
    this._ActivatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      // fetch product from api here
      console.log(`sub - ${this.id}`);
    });
    this._ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    // subscribing to query params
    this._ActivatedRoute.queryParamMap.subscribe((queryParamMap) => {
      console.log('Page - ' + queryParamMap.get('page'));
    });
  }

  onNext() {
    this._router.navigate(['product', '2'], {
      queryParams: { page: 3, sort: 'seller', color: 'red' },
    });

    // another way
    // this._router.navigateByUrl('product/2/page=3&sort=seller&color=red');
  }
}
