import { NgModule } from '@angular/core';
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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  // providers are injector instance where we register all dependencies which we are required in this application
  providers: [
    DatePipe,
    LoggerService,
    { provide: 'PRODUCT_SERVICE', useClass: ProductService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
