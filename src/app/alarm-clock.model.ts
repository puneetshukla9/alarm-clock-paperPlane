export class Time {
    hour: number;
    min: number;
    sec: number;
    am_pm: string = 'AM';
}
export enum AlarmStatus {
    'PLAYING' = 'Playing',
    'SNOOZED' = 'Snoozed',
    'STOPPED' = 'Stopped',
    'ACTIVE' = 'Active',
    'INACTIVE' = 'Inactive'
}
export class AlarmDetail {
    alarmTime: Time;
    status: AlarmStatus;
    onDays: Array<string>;
    isSnooze: boolean;
    constructor(initialize) {
        if (initialize) {
            this.alarmTime = new Time();
            this.status = AlarmStatus.ACTIVE;
            this.isSnooze = true;
            this.onDays = [];
        }
    }
}
export class AlarmDetails {
    alarmDetails: Array<AlarmDetail> = [];
}