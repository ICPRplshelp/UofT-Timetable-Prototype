import {crsMeeting, lecSession} from "../timetable/courseInterfaces";
import {range} from "rxjs";






export class Cell {
  // the text contents of the table.
  text: string = '';

  // if set to true, the table is empty regardless
  // of the other settings.
  isEmpty: boolean = true;

  // if set to true, this cell is spanned by other columns
  // and is ignored. surpasses isEmpty.
  // This must be declared - when walking through the table
  // for the last time, we get rid of any cell with this property true.
  isOverridden: boolean = false;
  rowSpan: number = 1;
  courseInstance?: CourseInst;
  cellType: 'time' | '' | 'course' = '';
}

export class CourseInst {
  courseCode: string = '';
  sessionNumber: string = '';
  startTime: string = '';
  endTime: string = '';
  deliveryMode: string = '';
  cellColor: string = '';

  // constructor(meetingInfo: crsMeeting, courseCode: string, deliveryMode: string,
  //             cellColor: string) {
  //
  // }
}

// here comes some funcs because that is the only
// I can implement them
// For each session, we need a course's
// lecSession

export class LectureChoiceInfo {
  lecSessionInfo: lecSession;
  crsCode: string = '';
  section: 'F' | 'S' | 'Y';
  delivery: string;
  color: string;

  constructor(lecSessionInfo: lecSession, crsCode: string,
              section: 'F' | 'S' | 'Y', delivery: string,
              color: string) {
    this.lecSessionInfo = lecSessionInfo;
    this.crsCode = crsCode;
    this.section = section;
    this.delivery = delivery;
    this.color = color;
  }
}


export class TableSystem {
  // This always starts at 8AM and ends at 10PM.
  // this means 0 <-> 8AM, 1 <-> 9 AM, 2 <-> 10AM, 4 <-> 12PM, and so on.
  cells: Cell[][] = [];

  constructor() {
    const timeOfDay: string[] = [
      '8:00',  // 0
      '9:00',  // 1
      '10:00',  // 2
      '11:00',  // 3
      '12:00',  // 4
      '13:00',  // 5
      '14:00',  // 6
      '15:00',  // 7
      '16:00',  // 8
      '17:00',  // 9
      '18:00',  // 10
      '19:00',  // 11
      '20:00',  // 12
      '21:00',  // 13
      '22:00'  // 14
    ]
    for (let i: number = 0; i < 14; i++) {
      let cellTime = new Cell();
      cellTime.isEmpty = false;
      cellTime.text = timeOfDay[i];
      cellTime.cellType = 'time';
      this.cells.push([cellTime, new Cell(), new Cell(), new Cell(), new Cell(), new Cell()])
    }
  }
  /**
   * Add all to table. Lectures may not conflict at all.
   * @param selInfo The lecture choice info.
   */
  addToTable(selInfo: LectureChoiceInfo) {
    const sectionSchedule = selInfo.lecSessionInfo.schedule
    for (let meeting of sectionSchedule) {
      if (meeting.meetingStartTime === undefined) {
        continue;
      }
      let startingHour = parseInt(meeting.meetingStartTime.split(':')[0]);
      let hourIndex = startingHour - 8;
      if (meeting.meetingEndTime === undefined) {
        continue;
      }
      let endingHour = parseInt(meeting.meetingEndTime.split(':')[0]);
      let meetingDay = dayMap(meeting.meetingDay);
      if (meetingDay === -1) {
        continue;
      }

      let tempCell = new Cell();
      tempCell.isEmpty = false;
      tempCell.courseInstance = new CourseInst();
      tempCell.courseInstance.courseCode = selInfo.crsCode;
      tempCell.courseInstance.cellColor = selInfo.color;
      tempCell.courseInstance.startTime = meeting.meetingStartTime;
      tempCell.courseInstance.endTime = meeting.meetingEndTime;
      // tempCell.courseInstance.sessionNumber = selInfo.



    }
  }
}


/**
 * Date to number
 * @param day
 */
function dayMap(day: string | undefined): number {
  if (day === undefined) {
    return -1;
  }
  switch (day) {
    case 'MO': return 1;
    case 'TU': return 2;
    case 'WE': return 3;
    case 'TH': return 4;
    case 'FR': return 5;
  }
  return -1;
}
