// Hello. This component is broken. Please do not try to use this.


import { Component, OnInit } from '@angular/core';
import {Cell} from "./scheduleInterface";
import { Cal, CalEntry } from './scheduleInterface2';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  fwText: string[] = ['Fall', 'Winter'];
  private dummyVar: string = "AA";
  // this is not the table heading. a table contains six columns.
  // weekend dates are to be discarded.
  // the cell contains data for a cell.
  // the table spans from 8:00 inclusive to 22:00 inclusive.
  totalTArray: (CalEntry | number)[][][] = [];
  totalNArray: string[][] = [];
  tableFall: (CalEntry | number)[][] = [];
  tNamesFall: string[] = [];
  table: (CalEntry | number)[][] = [];
  tNames: string[] = [];
  sessions: number[] = [0, 1];
  bgColors: string[] = [
          '#3CABB5',
          '#6E4DBC',
          '#1C996F',
          '#D1543B',
          '#C94973',
          '#D48A35',
          '#48ce00',
          '#a622d3',
          '#2d89d3',
          '#6b4a32',
          '#505050',
          '#003b6e',
          '#a445c0',
          '#9b9100',
          '#cb3500',
          '#492100',
          '#000000',
  ]

  ensureCalEntry(calE: CalEntry | Number): CalEntry {
    console.log(calE);
    if (calE instanceof CalEntry){
      return calE;
    } else{
      return new CalEntry('failure', 'AAA100Y1',
      'Y', '19:00-20:00', 'FF', 'YY', 4, 'LEC0101');  // the thing
      // that never returns
    }
  }

  calGetDuration(calE: CalEntry | number): number {
    if (calE instanceof CalEntry) {
      return calE.getDuration();
    } else {
      return 1;
    }
  }


  /**
   * Reload the table
   */
  reloadTable(): void {
    console.log('trying to reload the table');
    let tempExport = Cal.exportTimetable(true);
    let te1: (CalEntry | number)[][] = tempExport[0];
    let te2: string[] = tempExport[1];

    let tExportFall = Cal.exportTimetable(false);
    let tef1: (CalEntry | number)[][] = tExportFall[0];
    let tef2: string[] = tExportFall[1];

    this.tableFall = tef1.slice(9, 22);
    this.tNamesFall = tef2;

    this.tNames = te2;
    console.log(te1);
    this.table = te1.slice(8, 22);

    this.totalTArray = [this.tableFall, this.table];
    this.totalNArray = [this.tNamesFall, this.tNames];
  }


  determineBgColor(cl: Number | CalEntry, fw: number): string {
    if (cl instanceof Number){
      return 'white';
    } else if (cl instanceof CalEntry) {
      let crsName = cl.course_code + cl.course_session;
      // console.log('tnames and crs name', this.tNames, crsName);
      let theColor: number;
      if (fw === 0)
        theColor = this.tNamesFall.indexOf(crsName);
      else theColor = this.tNames.indexOf(crsName);

      if(theColor === -1){
        return 'black';
      } else {

        return this.bgColors[theColor % this.bgColors.length];
      }
    } else {
      return 'white';
    }
  }


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
