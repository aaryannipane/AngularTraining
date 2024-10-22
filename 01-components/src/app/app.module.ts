import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveComponent } from './components/directive/directive.component';
import { ttClassDirective } from './components/directive/tt-class.directive';
import { PipeComponent } from './components/pipe/pipe.component';
import { TempConverterPipe } from './components/pipe/temp-converter.pipe';
import { DatePipe } from '@angular/common';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { LifeCycleHookComponent } from './components/life-cycle-hook/life-cycle-hook.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductService } from './product.service';
import { LoggerService } from './logger.service';
import { HttpClientComponent } from './components/http-client/http-client.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { ErrorComponent } from './components/error/error.component';
import { RoutingComponent } from './components/routing/routing.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuardService } from './AuthGuard.service';
import { AdvanceComponentComponent } from './components/advance-component/advance-component.component';

export const API_URL = new InjectionToken<string>('');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DirectiveComponent,
    ttClassDirective,
    PipeComponent,
    TempConverterPipe,
    ComponentCommunicationComponent,
    LifeCycleHookComponent,
    ReactiveFormsComponent,
    ServicesComponent,
    HttpClientComponent,
    ErrorComponent,
    RoutingComponent,
    ProductsComponent,
    AdvanceComponentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  // providers are injector instance where we register all dependencies which we are required in this application
  providers: [
    DatePipe,
    { provide: 'PRODUCT_SERVICE', useClass: ProductService },
    { provide: API_URL, useValue: 'https://www.youtube.com' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
