import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { PipeComponent } from './components/pipe/pipe.component';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ServicesComponent } from './components/services/services.component';
import { HttpClientComponent } from './components/http-client/http-client.component';
import { RoutingComponent } from './components/routing/routing.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },

  { path: 'directive', component: DirectiveComponent },
  { path: 'pipe', component: PipeComponent },
  { path: 'form', component: ReactiveFormsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'http', component: HttpClientComponent },
  {
    path: 'product',
    component: ProductsComponent,
    children: [{ path: ':id', component: RoutingComponent }], // when we want nested view
  },
  // { path: 'product/:id', component: RoutingComponent }, // when we dont want nested view
  // { path: '', redirectTo: 'header', pathMatch: 'full' },
  { path: '', component: HeaderComponent }, // home route
  { path: '**', component: ErrorComponent }, // all other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
