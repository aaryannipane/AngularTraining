import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { DirectiveComponent } from './components/directive/directive.component';
import { ttClassDirective } from './components/directive/tt-class.directive';
import { PipeComponent } from './components/pipe/pipe.component';
import { TempConverterPipe } from './components/pipe/temp-converter.pipe';
import { DatePipe } from '@angular/common';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { LifeCycleHookComponent } from './components/life-cycle-hook/life-cycle-hook.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
