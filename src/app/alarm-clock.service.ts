import { Injectable } from '@angular/core';
import { Time, AlarmStatus, AlarmDetail } from './alarm-clock.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlarmClockService {
  currentTime: Time;
  alarmListState: Array<AlarmDetail> = [];
  currentDay: string;
  _interval: any;
  constructor(private router: Router) { }

  // gets the current time and coverts it to 12 hour format
  showCurrentTime() {
    this.currentTime = new Time();
    const currentTime = this.currentTime;
    const prev = {
      hour: -1,
      min: -1
    }
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    const date = new Date();
    this.currentDay = weekday[date.getDay()];
    clearTimeout(this._interval);
    this._interval = setInterval(() => {
      currentTime.hour = new Date().getHours();
      currentTime.min = new Date().getMinutes();

      currentTime.sec = new Date().getSeconds();
      currentTime.am_pm = (currentTime.hour > 12) ? 'PM' : 'AM';
      if (currentTime.hour > 12) {
        currentTime.hour = 12 - currentTime.hour;
      }

      if (currentTime.hour < 0) {
        currentTime.hour = currentTime.hour * -1;
      } else if (currentTime.hour === 0) {
        currentTime.hour = 12;
      } else {
        currentTime.hour = currentTime.hour;
      }
      currentTime.hour = this.appendZero(currentTime.hour);
      currentTime.min = this.appendZero(currentTime.min);
      currentTime.sec = this.appendZero(currentTime.sec);
      if (prev.hour !== currentTime.hour || prev.min !== currentTime.min) {
        prev.hour = currentTime.hour;
        prev.min = currentTime.min;
        this.checkAlarmStatus();
      }
    }, 1000);
  }

  // convert single digit number to double digit
  // for eg: 1 to 01
  appendZero(no): number {
    return no > 9 ? no : '0' + no;
  }

  // returns the label depending upon the no of days selected
  getAlarmStatus(alarm: AlarmDetail) {
    let label = 'Days: ';
    if (alarm.onDays.length === 7) {
      label = 'Everyday: ';
    } else if (alarm.onDays.indexOf('Sunday') === -1 && alarm.onDays.indexOf('Saturday') === -1) {
      label = 'Weekdays: ';
    } else if ((alarm.onDays.length <= 2)) {
      if ((alarm.onDays.length === 1) &&
        (alarm.onDays.indexOf('Sunday') !== -1 || alarm.onDays.indexOf('Saturday') !== -1)) {
        label = 'Weekend: ';
      }
      if ((alarm.onDays.length === 2) &&
        (alarm.onDays.indexOf('Sunday') !== -1 && alarm.onDays.indexOf('Saturday') !== -1)) {
        label = 'Weekend: ';
      }
    }
    return label + alarm.onDays.join(', ');
  }

  checkAlarmStatus() {
    const currentTime = this.currentTime;
    this.alarmListState.forEach(alarmDetail => {

      if (alarmDetail.status === AlarmStatus.ACTIVE &&
        Number(alarmDetail.alarmTime.hour) === Number(currentTime.hour) &&
        Number(alarmDetail.alarmTime.min) === Number(currentTime.min) &&
        alarmDetail.alarmTime.am_pm === currentTime.am_pm &&
        alarmDetail.onDays.indexOf(this.currentDay) !== -1) {
        alarmDetail.status = AlarmStatus.PLAYING;
        this.router.navigate(['/playing-alarm']);
      }
    });
  }

}
