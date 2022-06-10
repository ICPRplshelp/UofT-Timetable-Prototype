export interface crs {
  courseId: string,
  org: string,
  orgName: string,
  courseTitle: string,
  code: string,
  courseDescription: string,
  prerequisite: string,
  corequisite: string,
  exclusion: string,
  recommendedPreparation: string,
  section: "F" | "S" | "Y",
  session: string,
  webTimetableInstructions: string,
  deliveryInstructions: string,
  breadthCategories: string,
  distributionCategories: string,
  meetings: lecSession[],

  fallMeetings?: lecSession[],
  winterMeetings?: lecSession[],
  yearMeetings?: lecSession[],

  // If the course information is visible or not. toggled when clicked
  infoVisible: boolean,
  // whether the course is visible or not, and is a useless variable.
  show: boolean,
  // the color of the level.
  levelColor: string
  // the concrete breadth requirement. If 0, it means it doesn't count for anything.
  // 0: none, 6: 1-2, 7: 1-3, 8: 1-4, 9: 1-5, 10: 2-3, 11: 2-4, 12: 2-5, 13: 3-4, 14: 3-5, 15: 4-5
  // for now, always take the lowest breadth requirement.
  brq: 0 | 1 | 2 | 3 | 4 | 5  // | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  brqColor: string;
  codeWithSession: string
  brColors: string[];
  cardWidth: string;

  // Whether the course has a lecture section that is online
  hasOnline: boolean;
  level: number;  // the level of the course.
}

export interface lecSession {
  schedule: crsMeeting[];
  instructors: crsInstructor[];
  meetingId: string;
  teachingMethod: string;
  sectionNumber: string;
  subtitle: string;
  cancel: string;
  waitlist: string;
  deliveryMode: string;
  online: string;
  enrollmentCapacity: string;
  actualEnrolment: string;
  actualWaitlist: string;
  enrollmentIndicator?: string;
  meetingStatusNotes?: string;
  enrollmentControls: string[];
  key?: string;
}

export interface crsMeeting {
  meetingDay: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingScheduleId: string;
  assignedRoom1: string,
  assignedRoom2: string,
  key: string;
}

export interface crsInstructor {
  instructorId: string | null;
  firstName: string | null;
  lastName: string | null;
  key?: string | null;
}

