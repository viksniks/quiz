import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Timer, Time, TimerOptions } from 'timer-node';
import {ModalController} from "@ionic/angular";
import {ResultPage} from "../result/result.page";
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 questions:any[]=[];
 currentQuestion:any={};
 timer:any;
 started:boolean=false;
  interValId: any;
  currentTime: any;
 
  constructor(private http:HttpClient,private modal:ModalController) {}

  ngOnInit()
  {
    
  }
  

  nextQuestion(questionId)
  {
     this.currentQuestion = this.questions[parseInt(questionId)];
  }

  prevQuestion(questionId)
  {
    this.currentQuestion = this.questions[parseInt(questionId)-2];
  }

  startQuiz()
  {
    this.http.get("assets/question.json").subscribe((res:any)=>{
      this.questions = res;
      this.currentQuestion = res[0];
      this.timer = new Timer({
        label: 'test-timer',
        startTimestamp: new Date().getTime()// 2019-07-14 03:13:21.233Z
      });
      this.timer.start();
      this.interValId = setInterval(()=>{
        this.currentTime = this.timer.time();
        console.log(this.currentTime);
        if(this.currentTime.m == "1")
        {
        //   this.started = false;
        //  clearInterval(this.interValId);
        //  this.interValId = undefined;
        //  this.currentTime = undefined;
        //  this.timer.clear();
        this.openResults();

        }
     },1000)
      this.started = true;
      console.log(this.currentQuestion);
    })
    
  }

  radioChanged(event)
  {
console.log(event.target.value);
this.questions[parseInt(this.currentQuestion.questionId)]["yourAns"] = event.target.value;
  }

 openResults()
 {
this.modal.create({
  component:ResultPage,
  componentProps:{obj:this.questions},
  backdropDismiss:false
}).then((ele)=>{
  ele.present().then(()=>{

  
  this.started = false;
  clearInterval(this.interValId);
  this.interValId = undefined;
  this.currentTime = undefined;
  this.timer.clear();
  })
  
})
 }

}
