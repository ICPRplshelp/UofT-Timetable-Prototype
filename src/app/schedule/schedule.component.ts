// Hello. This component is broken. Please do not try to use this.


import { Component, OnInit } from '@angular/core';
import {Cell} from "./scheduleInterface";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  // this is not the table heading. a table contains six columns.
  // weekend dates are to be discarded.
  // the cell contains data for a cell.
  // the table spans from 8:00 inclusive to 22:00 inclusive.
  table: Cell[][] = [];


  // we assume that sampleTable is generated such that
  // rowSpans are respected already.
  // sampleTable: cell[][] = [
  //   [emC(), emC(), emC(), emC(), emC(), emC()],
  //   [emC(), emC(), emC(), emC(), emC(), emC()]
  // ];

  constructor() { }

  ngOnInit(): void {
  }
}


// /**
//  * Return an empty cell.
//  */
// // function emC(): Cell {
// //   return new class implements Cell {
// //     isEmpty: boolean = false;
// //     isOverridden: boolean = false;
// //     text: string = 'empty';
// //     rowSpan: number = 1;
// //   }
// // }
