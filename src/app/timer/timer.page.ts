import { Component, OnInit } from '@angular/core';

import {Timer} from "timer-node";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  timer:Timer;
  interValId:any;
  currentTime:any={}
  constructor() { }

  ngOnInit() {
   
    this.timer =  new Timer({
      startTimestamp:new Date().getTime()
    })
  }

  startTimer()
  {
   
   this.timer.start();
   
   this.interValId = setInterval(()=>{
      this.currentTime = this.timer.time();
   },1000)
   
   
   
  }

  
  stopTimer()
  {
   this.timer.stop();
   if(this.interValId)
   {
     clearInterval(this.interValId);
     this.interValId = undefined;
   }
  }

}
