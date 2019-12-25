import { Component } from '@angular/core';
import { Time, AlarmDetails, AlarmDetail, AlarmStatus } from './alarm-clock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alarm-clock';
  currentTime: Time;
  showAlarmList = false;
  hours: Array<{ label: string, value: string }>;
  minutes: Array<{ label: string, value: string }>;
  amPm: Array<{ label: string, value: string }>;
  noOfDays: Array<{ label: string, value: string }>;
  onDays: Array<string> = [];
  alarmTime: Time = new Time();
  alarmList: AlarmDetails = new AlarmDetails();
  alarmStatusEnum = AlarmStatus;

  constructor() {

  }

  ngOnInit() {
    this.hours = [...Array(12).keys()].map(x => {
      return {
        label: String(this.appendZero(++x)),
        value: String(this.appendZero(++x))
      };

    });
    this.minutes = [...Array(60).keys()].map(x => {
      return {
        label: String(this.appendZero(++x)),
        value: String(this.appendZero(++x))
      };

    });
    this.noOfDays = [{ label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' }],
      this.amPm = [{ label: 'AM', value: 'AM' }, { label: 'PM', value: 'PM' }];
    this.showCurrentTime();
  }

  showCurrentTime() {
    this.currentTime = new Time();
    const currentTime = this.currentTime;
    let interVal = setInterval(() => {
      currentTime.hour = new Date().getHours();
      currentTime.min = new Date().getMinutes();

      currentTime.sec = new Date().getSeconds();
      currentTime.am_pm = (currentTime.hour > 12) ? 'PM' : 'AM';
      currentTime.hour = 12 - currentTime.hour;
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
    }, 1000);
  }

  appendZero(no): number {
    return no > 9 ? no : '0' + no;
  }

  onAlarmClick() {
    this.showAlarmList = true;
  }
  onSetAlarmClick() {
    let nAlarm = new AlarmDetail(true);
    nAlarm.alarmTime.hour = this.alarmTime.hour;
    nAlarm.alarmTime.min = this.alarmTime.min;
    nAlarm.alarmTime.am_pm = this.alarmTime.am_pm;
    nAlarm.onDays = this.onDays;
    this.alarmList.alarmDetails.push(nAlarm);
    this.resetAlarm();
  }
  //reset the alarm values
  resetAlarm() {
    this.alarmTime = new Time();
    this.onDays = [];
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

  changeStatus(alarm: AlarmDetail) {
    if (alarm.status === AlarmStatus.ACTIVE) {
      alarm.status = AlarmStatus.INACTIVE;
    } else if (alarm.status === AlarmStatus.INACTIVE) {
      alarm.status = AlarmStatus.ACTIVE;
    }
  }
}
