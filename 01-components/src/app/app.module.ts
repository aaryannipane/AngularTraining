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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DirectiveComponent,
    ttClassDirective,
    PipeComponent,
    TempConverterPipe,
    
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
