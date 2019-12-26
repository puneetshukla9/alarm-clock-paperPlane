import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { HomeComponent } from './home/home.component';
import { AlarmConfigureComponent } from './alarm-configure/alarm-configure.component';
import { AlarmPlayComponent } from './alarm-play/alarm-play.component';
import {CheckboxModule} from 'primeng/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlarmConfigureComponent,
    AlarmPlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
