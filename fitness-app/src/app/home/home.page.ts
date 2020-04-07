import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fullTime: any = '00:01:30';
  percent = 0;
  radius = 100;
  minutes = 1;
  seconds = '30';

  timer;
  progress = 0;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  };

  overallTimer: any;


  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - countDownDate.getTime();

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

     }, 1000);
  }

  pad(num, size) {
    let s = num+'';
    while (s.length < size) { s = '0' + s;
                              return s;
  }
  }

  startTime() {

    if (this.timer) {
      clearInterval(this.timer);
    }

    // Check if overallTimer is set to true or false
    if (!this.overallTimer) {
        this.progressTimer();
      }

    this.timer =  false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    // tslint:disable-next-line: radix
    const totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

    this.timer = setInterval(() => {

      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }
      this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress++;
    }, 1000) as any;
  }

  constructor() {}

}
