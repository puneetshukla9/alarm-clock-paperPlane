import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlarmConfigureComponent } from './alarm-configure/alarm-configure.component';
import { AlarmPlayComponent } from './alarm-play/alarm-play.component';


const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'configure-alarm', component: AlarmConfigureComponent },
{ path: 'playing-alarm', component: AlarmPlayComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
