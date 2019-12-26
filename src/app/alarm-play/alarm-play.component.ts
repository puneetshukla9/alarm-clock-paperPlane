import { Component, OnInit } from '@angular/core';
import { AlarmDetail, AlarmStatus } from '../alarm-clock.model';
import { Router } from '@angular/router';
import { AlarmClockService } from '../alarm-clock.service';

@Component({
  selector: 'app-alarm-play',
  templateUrl: './alarm-play.component.html',
  styleUrls: ['./alarm-play.component.scss']
})
export class AlarmPlayComponent implements OnInit {
  alarmStatusEnum = AlarmStatus;
  constructor(private router: Router, public alarmService: AlarmClockService) { }

  ngOnInit() {
    let playingFlag = false;
    this.alarmService.alarmListState.forEach(alarmDetail => {
      if (alarmDetail.status === AlarmStatus.PLAYING) {
        playingFlag = true;
        return;
      }
    });
    if (playingFlag) {
      this.playAudio();
    } else {
      this.router.navigate(['/home']);
    }

  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/alarm.wav';
    audio.load();
    audio.play();
  }
  stopAlarm() {
    this.changeStatus(AlarmStatus.STOPPED);
    this.router.navigate(['/home']);
  }
  snoozeAlarm() {
    this.changeStatus(AlarmStatus.SNOOZED);
    this.router.navigate(['/home']);
  }
  changeStatus(status: AlarmStatus) {
    this.alarmService.alarmListState.forEach(alarmDetail => {
      if (alarmDetail.status === AlarmStatus.PLAYING) {
        alarmDetail.status = status;
      }
    });
  }
}
