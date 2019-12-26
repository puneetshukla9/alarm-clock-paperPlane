import { Component, OnInit } from '@angular/core';
import { AlarmClockService } from '../alarm-clock.service';
import { AlarmDetail, Time, AlarmStatus } from '../alarm-clock.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-alarm-configure',
  templateUrl: './alarm-configure.component.html',
  styleUrls: ['./alarm-configure.component.scss']
})
export class AlarmConfigureComponent implements OnInit {
  alarmTime: Time = new Time();
  hours: Array<{ label: string, value: string }>;
  minutes: Array<{ label: string, value: string }>;
  amPm: Array<{ label: string, value: string }>;
  noOfDays: Array<{ label: string, value: string }>;
  onDays: Array<string> = [];
  alarmListState: Array<AlarmDetail>;
  alarmStatusEnum = AlarmStatus;
  alarmBtnClick = false;
  editAlarmFlag = false;
  constructor(public alarmService: AlarmClockService) { }

  ngOnInit() {
    this.hours = [...Array(12).keys()].map(x => {
      return {
        label: String(this.alarmService.appendZero(++x)),
        value: String(this.alarmService.appendZero(x))
      };

    });
    this.minutes = [...Array(60).keys()].map(x => {
      return {
        label: String(this.alarmService.appendZero(++x)),
        value: String(this.alarmService.appendZero(x))
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
    this.alarmListState = this.alarmService.alarmListState;
  }
  onAlarmBtnClick() {
    this.resetAlarm();
    this.alarmBtnClick = true;
  }
  // add alarm
  onSetAlarmClick() {
    let nAlarm = new AlarmDetail(true);
    nAlarm.alarmTime.hour = this.alarmTime.hour;
    nAlarm.alarmTime.min = this.alarmTime.min;
    nAlarm.alarmTime.am_pm = this.alarmTime.am_pm;
    nAlarm.onDays = this.onDays;
    this.alarmService.alarmListState.push(nAlarm);
    this.resetAlarm();
    this.editAlarmFlag = false;
    this.alarmBtnClick = false;
    console.log(this.alarmListState);
  }

  //reset the alarm values
  resetAlarm() {
    this.alarmTime = new Time();
    this.onDays = [];
    this.editAlarmFlag = false;
  }
  editAlarm(alarm: AlarmDetail) {
    this.alarmTime.hour = _.cloneDeep(alarm.alarmTime.hour);
    this.alarmTime.min = _.cloneDeep(alarm.alarmTime.min);
    this.alarmTime.am_pm = _.cloneDeep(alarm.alarmTime.am_pm);
    this.onDays = _.cloneDeep(alarm.onDays);
    this.editAlarmFlag = true;
  }
  deleteAlarm(alarm: AlarmDetail, index: number) {
    this.alarmService.alarmListState.splice(index, 1);
  }
  changeStatus(alarm: AlarmDetail) {
    if (alarm.status === AlarmStatus.ACTIVE) {
      alarm.status = AlarmStatus.INACTIVE;
    } else if (alarm.status === AlarmStatus.INACTIVE) {
      alarm.status = AlarmStatus.ACTIVE;
    }
  }
}
