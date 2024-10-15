import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css',
})
export class PipeComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}
  toDate: Date = new Date();
  anotherDate: any;
  obj: Object = {
    username: 'aryanipane',
    email: 'nipaneeducation@gmail.com',
    age: 21,
  };

  obsValue = new Observable((observer) => {
    console.log('Observable starts');
    setTimeout(() => {
      console.log('Retuns Value');
      observer.next('1000');
    }, 5000);
  });

  ngOnInit(): void {
    this.anotherDate = this.datePipe.transform(new Date(), 'medium');
  }
}
