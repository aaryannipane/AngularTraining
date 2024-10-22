import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  MaybeAsync,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

export interface IDeactivateComponent {
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AuthGuardService
  implements
    CanActivate,
    CanActivateChild,
    CanDeactivate<IDeactivateComponent>,
    Resolve<Product>
{
  constructor(
    private _router: Router,
    @Inject('PRODUCT_SERVICE') private _productService: ProductService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(route.url);

    // check some condition like authentication
    if (false) {
      alert('you are not allowed to view this page');
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (false) {
      alert('only admin can access this page');
      return false;
    }

    return true;
  }

  canDeactivate(
    component: IDeactivateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canExit ? component.canExit() : true;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._productService.getProducts();
  }
}
