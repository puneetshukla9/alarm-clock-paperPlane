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
  showSnooze = true;
  constructor(private router: Router, public alarmService: AlarmClockService) { }
  audio: HTMLAudioElement;
  ngOnInit() {
    let playingFlag = false;
    this.alarmService.alarmListState.forEach(alarmDetail => {
      if (alarmDetail.status === AlarmStatus.PLAYING) {
        if (!alarmDetail.isSnooze) {
          this.showSnooze = false;
        }
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
    this.audio = new Audio();
    this.audio.src = '../../../assets/audio.mp3';
    this.audio.load();
    this.audio.play();
  }
  stopAlarm() {
    this.changeStatus(AlarmStatus.STOPPED);
    this.audio.pause();
    this.audio = null;
    this.router.navigate(['/home']);
  }
  snoozeAlarm() {
    this.changeStatus(AlarmStatus.SNOOZED);
    this.audio.pause();
    this.audio = null;
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
