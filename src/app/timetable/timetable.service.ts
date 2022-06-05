import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {combineLatest, Observable, tap} from 'rxjs';
import {crs, lecSession} from "./courseInterfaces";
import {utilities} from "./utilities";
import {cItems} from "../course-list/course-list.component";

@Injectable({
  providedIn: 'root'
})

export class TimetableService {

  yearSession: string = "20229";
  productURL: string = "api/" + this.yearSession + "/coursesCSC.json";
  // rawURL: string = "api/courses2/courses";
  // rawURLend: string = ".json";
  //products: any = ;
  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(this.productURL).pipe(
      tap(data => {
      })
    );
  }

  getAllCoursesInMultipleDes(desMultiple: string[], globalSession: string): crs[][] | null {
    let obsv: Observable<any>[] = [];
    let masterCourseDict: any = {};
    let masterList: any[] = [];
    let splitCourseList = [];
    let failed = false;
    for (let des1 of desMultiple) {
      this.getAllCoursesInDes(des1, globalSession).subscribe(
        data => {
          let tempCourseList = items(data, true);  // always disallow dupes
          processCourselist(tempCourseList);
          masterList.push(...tempCourseList);
        }, () => {console.log("WHY");
          failed = true;}, () => {}
      );
      if (failed) {
        break;
      }
    }
    if (!failed) {
      splitCourseList = splitListToLevels(masterList)
      return splitCourseList;
    } else {return null;}

    // currently, obsv is a list of observables, which is actually json
    // stuff to be combined, so if I want to get the contents in each
    // observable, I can do something:
    // return obsv;
  }


  getAllCoursesInDes(des: string, globalSession: string): Observable<any> {
    this.yearSession = globalSession;
    return this.http.get<any>(this.desToLink(des)).pipe(
      tap(data => console.log({}))
    );
  }

  desToLink(des: string): string {
    return "api/" + this.yearSession + "/courses" + des + ".json";
  }

  // do not process courses in the frontend. Please help.


  // getCourseList(des: string): Observable<any> {
  //   return this.http.get<any>(this.rawURL + des + this.rawURLend).pipe(
  //     tap(data=>console.log('my data = ',JSON.stringify(data)))
  //   );
  // }


}

// const maxCards = 49999;
function items(obj: any, noDuplicates: boolean = false) {
  let i, arr = [];
  let j = 0;
  for (i in obj) {
    arr.push(obj[i]);
    j++
    if (j >= maxCards) {
      break;
    }
  }
  // arr.sort((a, b) => a.code.localeCompare(b.code));
  if (noDuplicates)
    return removeDuplicates(arr);
  else return arr;
}

function removeDuplicates(tempCourseList: any[]): any[] {

  let checkedCodes: string[] = [];
  let uniques: any[] = [];
  tempCourseList.forEach(element => {
    if (!checkedCodes.includes(element.code)) {
      // if the course is not already in

      switch (element.section) {
        case 'F':
          element.fallMeetings = element.meetings;
          break;
        case 'S':
          element.winterMeetings = element.meetings;
          break;
        case 'Y':
          element.yearMeetings = element.meetings;
          break;
        default:
          console.log('No meetings???');
      }


      uniques.push(element);
      checkedCodes.push(element.code);
    } else {
      const ind = checkedCodes.indexOf(element.code);

      switch (element.section) {
        case 'F':
          uniques[ind].fallMeetings = element.meetings;
          break;
        case 'S':
          uniques[ind].winterMeetings = element.meetings;
          break;
        case 'Y':
          uniques[ind].yearMeetings = element.meetings;
          break;
        default:
          console.log('No meetings???');
      }

    }
  })
  return uniques

}


const defaultCardWidth = '20%';
const expandedCardWidth = '100%';
const allowHTMLTags = true;
const maxCards = 49999;
const colorRed = '#ff6600';
const colorBlue = '#52b1ff';
const colorGreen = '#00c427';
const colorPurple = '#9436ff'
const colorYellow = '#ffbf00';

/**
 * Process the course list. That is, make it readable.
 * @param cList
 */
function processCourselist(cList: crs[]): void {
  // determine the level of the course.
  cList.forEach(element => {

    let levelNumber = element.code[3]
    // console.log(levelNumber);
    if (levelNumber === '1') { // this
      // console.log('case 1');
      element.level = 1;
      element.levelColor = utilities.levelColors[1];
    } else if (levelNumber === '2') {
      // console.log('case 2');
      element.level = 2;
      element.levelColor = utilities.levelColors[2];
    } else if (levelNumber === '3') {
      // console.log('case 3');
      element.level = 3;
      element.levelColor = utilities.levelColors[3];
    } else if (levelNumber === '4') {
      // console.log('case 4');
      element.level = 4;
      element.levelColor = utilities.levelColors[4];
    } else {
      console.log('case default');
      element.level = 1;
      element.levelColor = utilities.levelColors[0];
    }

    // Determine the breadth requirement.
    const br: string = element.breadthCategories;
    const brArray: number[] = [];
    if (br.includes('1')) brArray.push(1);
    if (br.includes('2')) brArray.push(2);
    if (br.includes('3')) brArray.push(3);
    if (br.includes('4')) brArray.push(4);
    if (br.includes('5')) brArray.push(5);
    if (brArray.length === 0) brArray.push(0);

    element.brColors = [];
    brArray.forEach((br) => {
      element.brColors.push(utilities.brColors[br])
    })

    element.brqColor = utilities.brColors[element.brq];
    element.cardWidth = '20%';

    // add a display
    element.infoVisible = false;
    element.show = true;
    // element.courseDescription = (element.CourseDescription);
    element.courseDescription = removeTags(element.courseDescription)

    // change how meetings appear
    element.meetings = cItems(element.meetings);
    element.meetings.forEach((ls: lecSession) => {
      ls.schedule = cItems(ls.schedule);
      ls.instructors = cItems(ls.instructors);
    })
    if (element.fallMeetings !== undefined && element.fallMeetings !== null) {
      element.fallMeetings = cItems(element.fallMeetings);
      element.fallMeetings.forEach((ls: lecSession) => {
        ls.schedule = cItems(ls.schedule);
        ls.instructors = cItems(ls.instructors);
      })
    }
    if (element.winterMeetings !== undefined && element.winterMeetings !== null) {
      element.winterMeetings = cItems(element.winterMeetings);
      element.winterMeetings.forEach((ls: lecSession) => {
        ls.schedule = cItems(ls.schedule);
        ls.instructors = cItems(ls.instructors);
      })
    }
    if (element.yearMeetings !== undefined && element.yearMeetings !== null) {
      element.yearMeetings = cItems(element.yearMeetings);
      element.yearMeetings.forEach((ls: lecSession) => {
        ls.schedule = cItems(ls.schedule);
        ls.instructors = cItems(ls.instructors);
      })
    }
    // meeting to be changed to an entry of meetings
    // change how schedules appear
    console.log(element);
    // add codeWithSession
    element.codeWithSession = element.code + ' ' + element.section;
    if (checkOnlineOption(element)) {
      element.hasOnline = true;
    } else {
      element.hasOnline = false;
    }

  })
}

function checkOnlineOption(course: crs): boolean {
  const onlineModes = ['SYNC', 'SYNIF', 'ASYNC', 'ASYIF',
    'ONLSYNC', 'ONLASYNC'];
  if (course.fallMeetings !== undefined) {
    for (let meeting of course.fallMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
        meeting.teachingMethod === 'LEC') {
        return true;
      }
    }
  }
  if (course.winterMeetings !== undefined) {
    for (let meeting of course.winterMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
        meeting.teachingMethod === 'LEC') {
        return true;
      }
    }
  }
  if (course.yearMeetings !== undefined) {
    for (let meeting of course.yearMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
        meeting.teachingMethod === 'LEC') {
        return true;
      }
    }
  }

  return false;
}


function removeTags(str: string) {

  if (!allowHTMLTags) {
    if ((str === null) || (str === ''))
      return '';
    else
      str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
  } else {
    return str;
  }
}


function splitListToLevels(cList: any[]): any[][] {
  // cList is a list of courses2.
  // split all courses2 to 100, 200, 300, and 400 level
  // courses2, based on the order they appear in.
  // we will assume that the courses2 are sorted.
  // let targetLevel = 1;
  console.log('SPLITTING LISTS TO LEVELS');
  console.log(cList);
  let courses: any[][] = [[], [], [], []];
  cList.forEach(element => {
    if (element.level >= 1 && element.level <= 4) {
      courses[element.level - 1].push(element);
    } else {
      console.log('invalid element level that isn\'t 0 to 4');
    }
  })

  return courses
}
