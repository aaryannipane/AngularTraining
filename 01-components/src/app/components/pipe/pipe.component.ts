import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {
 
  toDate: Date = new Date();
 

  obsValue = new Observable((observer)=>{
    console.log("Observable starts");
    setTimeout(()=>{
      console.log("Retuns Value");
      observer.next("1000")
    }, 5000)
    
  })

  



}
