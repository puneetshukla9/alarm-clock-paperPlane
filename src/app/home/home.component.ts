import { Component, OnInit } from '@angular/core';
import { Time, AlarmDetail, AlarmStatus, AlarmDetails } from '../alarm-clock.model';
import { AlarmClockService } from '../alarm-clock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'alarm-clock';
  currentTime: Time;
  currentDate: string


  constructor(public alarmService: AlarmClockService, private router: Router) {

  }

  ngOnInit() {
    this.alarmService.showCurrentTime();
    this.currentTime = this.alarmService.currentTime;
    this.currentDate = new Date().toISOString().slice(0,10);;
  }
  onAlarmClick() {
    this.router.navigate(['/configure-alarm']);
  }











}
