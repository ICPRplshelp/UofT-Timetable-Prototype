import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TimetableService} from './timetable.service';
import {crs, lecSession} from "./courseInterfaces";
import {utilities} from "./utilities";
import {cItems} from "../course-list/course-list.component";
import {CourseListComponent} from "../course-list/course-list.component";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogExampleComponent} from "../dialog-example/dialog-example.component";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  // allDes: Set<string> = new Set( ['ABP', 'ACT', 'AFR', 'AMS', 'ANA', 'ANT', 'APM', 'ARH', 'AST', 'BCB', 'BCH', 'BIO', 'BMS', 'BPM', 'CAR', 'CAS', 'CDN', 'CHC', 'CHM', 'CIN', 'CJH', 'CJS', 'CLA', 'CLT', 'COG', 'CRE', 'CRI', 'CSB', 'CSC', 'CSE', 'CTA', 'DHU', 'DRM', 'DTS', 'EAS', 'ECO', 'EDS', 'EEB', 'ENG', 'ENT', 'ENV', 'ESS', 'EST', 'ETH', 'EUR', 'FAH', 'FCS', 'FIN', 'FOR', 'FRE', 'FSL', 'GER', 'GGR', 'GRK', 'HIS', 'HMB', 'HPS', 'HST', 'HUN', 'IFP', 'IMM', 'INI', 'INS', 'IRE', 'IRW', 'ITA', 'JAL', 'JCA', 'JCI', 'JCR', 'JEG', 'JEH', 'JFG', 'JFP', 'JGA', 'JGE', 'JGJ', 'JGU', 'JHA', 'JHM', 'JIG', 'JLN', 'JLP', 'JLS', 'JNH', 'JNR', 'JNS', 'JPA', 'JPE', 'JPH', 'JPI', 'JPM', 'JPR', 'JPS', 'JQR', 'JRC', 'JRN', 'JSC', 'JSH', 'JSU', 'JWE', 'LAS', 'LAT', 'LCT', 'LIN', 'LMP', 'MAT', 'MCS', 'MGR', 'MGT', 'MGY', 'MHB', 'MIJ', 'MST', 'MUN', 'MUS', 'NEW', 'NFS', 'NMC', 'NML', 'PCJ', 'PCL', 'PDC', 'PHC', 'PHL', 'PHS', 'PHY', 'PLN', 'POL', 'PPG', 'PRT', 'PSL', 'PSY', 'REN', 'RLG', 'RSM', 'SAS', 'SDS', 'SLA', 'SMC', 'SOC', 'SPA', 'STA', 'TRN', 'UNI', 'URB', 'VIC', 'WDW', 'WGS', 'WRR']
  // );

  coursesData: any;

  constructor(private timetableService: TimetableService,
              public dialog: MatDialog,
              ) {
  }


  // openDialog() {
  //   this.dialog.open(DialogExampleComponent);
  // }

  // this value is binded.

  designators: Set<string> = new Set(['ABP', 'ACT', 'AFR', 'AMS', 'ANA', 'ANT', 'APM', 'ARH', 'AST', 'BCB', 'BCH', 'BIO', 'BMS', 'BPM', 'CAR', 'CAS', 'CDN', 'CHC', 'CHM', 'CIN', 'CJH', 'CJS', 'CLA', 'CLT', 'COG', 'CRE', 'CRI', 'CSB', 'CSC', 'CSE', 'CTA', 'DHU', 'DRM', 'DTS', 'EAS', 'ECO', 'EDS', 'EEB', 'ENG', 'ENT', 'ENV', 'ESS', 'EST', 'ETH', 'EUR', 'FAH', 'FCS', 'FIN', 'FOR', 'FRE', 'FSL', 'GER', 'GGR', 'GRK', 'HIS', 'HMB', 'HPS', 'HST', 'HUN', 'IFP', 'IMM', 'INI', 'INS', 'IRE', 'IRW', 'ITA', 'JAL', 'JCA', 'JCI', 'JCR', 'JEG', 'JEH', 'JFG', 'JFP', 'JGA', 'JGE', 'JGJ', 'JGU', 'JHA', 'JHM', 'JIG', 'JLN', 'JLP', 'JLS', 'JNH', 'JNR', 'JNS', 'JPA', 'JPE', 'JPH', 'JPI', 'JPM', 'JPR', 'JPS', 'JQR', 'JRC', 'JRN', 'JSC', 'JSH', 'JSU', 'JWE', 'LAS', 'LAT', 'LCT', 'LIN', 'LMP', 'MAT', 'MCS', 'MGR', 'MGT', 'MGY', 'MHB', 'MIJ', 'MST', 'MUN', 'MUS', 'NEW', 'NFS', 'NMC', 'NML', 'PCJ', 'PCL', 'PDC', 'PHC', 'PHL', 'PHS', 'PHY', 'PLN', 'POL', 'PPG', 'PRT', 'PSL', 'PSY', 'REN', 'RLG', 'RSM', 'SAS', 'SDS', 'SLA', 'SMC', 'SOC', 'SPA', 'STA', 'TRN', 'UNI', 'URB', 'VIC', 'WDW', 'WGS', 'WRR'])

  courseFilter: string = '';  // this value is binded.
  splitted: string[] = [];
  courseList: any[] = [];
  allCourses: any[][] = [];
  splitCourseList: crs[][] = [];
  noDuplicates: boolean = true;

  focusedCourseMeetings: lecSession[] = [];



  clicked(): void {
    this.courseFilter = this.courseFilter.toUpperCase();
    this.splitted = this.courseFilter.split(',');
    this.splitted = this.splitted.map(item => item.trim());
    console.log(this.splitted);
    this.getManyCourses(this.splitted);

    // if (this.courseFilter.replace(" ", "") !== "") {
    //   let tempCourseList = this.courseList.filter(course => this.splitted.includes(course.org));
    //
    //   this.splitCourseList = splitListToLevels(tempCourseList);
    // } else {
    //   this.splitCourseList = splitListToLevels(this.courseList);
    // }
   // console.log('clicked!!!');

    // let splitted = this.courseFilter.split(',');
    // this.splitCourseList.forEach(
    //   indLevel => indLevel.forEach(indCourse => indCourse.org == this.courseFilter ? indCourse.show = true : indCourse.show = false)
    // )
    // console.log(this.splitCourseList, splitted);

  }

  /**
   * Adjust this.splitCourseList to only include courses2
   * with designators matching the argument.
   * @param designatorsList A list of designators to keep.
   */
  getManyCourses(designatorsList: string[]): void {

    let masterList: any[] = [];
    for (let des of designatorsList) {
      this.timetableService.getAllCoursesInDes(des).subscribe(
        data => {
          // console.log('timetable', data);
          // console.log('timetable1', this.coursesData.length);

          // all converted to a list
          let courseList = items(data, this.noDuplicates);
          // console.log(coursesData);
          // console.log(courseList);

          // process the courses2 we have
          processCourselist(courseList);
          // console.log(courseList);
          masterList.push(...courseList);
          // split the entire course list
          // console.log(this.splitCourseList);
        },
        () => {

        },
        () => {
          // console.log('master list is', masterList)
          this.splitCourseList = splitListToLevels(masterList);
          // console.log("now, the split course list is", this.splitCourseList);
        })
    }
  }

  keyDownFunction(event: { keyCode: number; }) {
    if (event.keyCode === 13) {
      this.clicked();
      // rest of your code
    }
  }

  ngOnInit(): void {
    this.timetableService.getCourses().subscribe(
      data => {
        // console.log('timetable', data);
        this.coursesData = data;

        // console.log('timetable1', this.coursesData.length);

        // all converted to a list
        this.courseList = items(this.coursesData, this.noDuplicates);
        console.log(this.coursesData);
        console.log(this.courseList);

        // process the courses2 we have
        processCourselist(this.courseList);
        console.log(this.courseList);
        this.courseList.filter(course => course.org === this.courseFilter);
        // this.courseList.forEach(course => console.log(course.org));

        // split the entire course list
        this.splitCourseList = splitListToLevels(this.courseList);
        console.log('the split course list is now', this.splitCourseList);
      })
  }

  clearHTMLTags(text: string): string {
    // let temp = text.replace('</p> <p>', '\n\n').replace('<p>', '').replace('</p>', '').replace('<br />', '');
    let temp = removeTags(text);
    // console.log(temp);
    return temp
  }

  dialogConfig = new MatDialogConfig();


  /**
   * Returns true if the course has at least one online lecture session.
   * @param course The course to check.
   * @returns true if the course has one online lecture session.
   */


  onCourseClicked(course: crs): void {
    console.log('course clicked: ' + course.code);
    course.infoVisible = !course.infoVisible;
    course.cardWidth = course.cardWidth == defaultCardWidth ? expandedCardWidth : defaultCardWidth;
    // this.dialog.open(DialogExampleComponent,
    //   {  });
  }

  openCourseDialog(tempCourse: crs): void {
    const dialogConfig = new MatDialogConfig();
    const perWidth = 600;
    // const finalWidth = perWidth * tempCourse.
    let finalWidth = 0;

    console.log(tempCourse.fallMeetings);

    // fallMeetings: tempCourse.fallMeetings, winterMeetings: tempCourse.winterMeetings,
    //       yearMeetings: tempCourse.yearMeetings
    dialogConfig.data = {};
    if (tempCourse.fallMeetings !== undefined) {
      dialogConfig.data.fallMeetings = tempCourse.fallMeetings;
    finalWidth += 600;
    }
    if (tempCourse.winterMeetings !== undefined){
      dialogConfig.data.winterMeetings = tempCourse.winterMeetings;
    finalWidth += 600;
    }
    if (tempCourse.yearMeetings !== undefined){
      dialogConfig.data.yearMeetings = tempCourse.yearMeetings;
    finalWidth += 600;
    }
    finalWidth = Math.max(Math.min(finalWidth, 1500), 600)
    dialogConfig.width = finalWidth.toString() + 'px';


    // this.focusedCourseMeetings = meetings;
    const dialogRef = this.dialog.open(CourseListComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openHelpDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(DialogExampleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`) ;
    });
  }

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
    if (element.fallMeetings !== undefined && element.fallMeetings !== null){
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

      switch(element.section){
        case 'F': element.fallMeetings = element.meetings; break;
        case 'S': element.winterMeetings = element.meetings; break;
        case 'Y': element.yearMeetings = element.meetings; break;
        default: console.log('No meetings???');
      }


      uniques.push(element);
      checkedCodes.push(element.code);
    } else {
      const ind = checkedCodes.indexOf(element.code);

      switch(element.section){
        case 'F': uniques[ind].fallMeetings = element.meetings; break;
        case 'S': uniques[ind].winterMeetings = element.meetings; break;
        case 'Y': uniques[ind].yearMeetings = element.meetings; break;
        default: console.log('No meetings???');
      }

    }
  })
  return uniques

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

function checkOnlineOption(course: crs): boolean {
  const onlineModes = ['SYNC', 'SYNIF', 'ASYNC', 'ASYIF',
  'ONLSYNC', 'ONLASYNC'];
  if (course.fallMeetings !== undefined){
    for (let meeting of course.fallMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
      meeting.teachingMethod === 'LEC'){
        return true;
      }
    }
  }
  if (course.winterMeetings !== undefined){
    for (let meeting of course.winterMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
      meeting.teachingMethod === 'LEC'){
        return true;
      }
    }
  }
  if (course.yearMeetings !== undefined){
    for (let meeting of course.yearMeetings) {
      if (onlineModes.includes(meeting.deliveryMode) &&
      meeting.teachingMethod === 'LEC'){
        return true;
      }
    }
  }

  return false;
}
