// I get it. lowercase class name.
export class utilities {
  // colors associated with breadth requirements
  static brColors: string[] = [
    '#474545',  // no breath requirement
    '#d71a1a',  // br1
    '#34e7ff',
    '#ffd300',
    '#0ddc09',
    '#bb4bff'   // br5
  ];

  // colors associated with the background of courses based on course level (100, 200, 300, 400)
  static levelColors: string[] = [
    '#444444',  // 0-level
    '#02ad23',  // 100-level
    '#3694ff',
    '#9436ff',
    '#f53d00',  // 400-level
    '#5454e8',  // 500-level
    "#78630e", // 600-level,
    "#85462c" // 700-level
  ]

  static tableSessionColors: string[] = [
    '#ffd3a4',  // fall
    '#a6f1ff',  // winter
    '#d5abff'   // year
  ]

  // background colors of the XX:XX-XX:XX elements in the course section list
  static dayColors: string[] = [
    'Coral',  // mon [0] FF7F50
    'bisque',  // tues [1] FFE4C4
    '#67e09b',  // wed [2] 67e09b
    'DodgerBlue',  // thurs [3] 1E90FF
    'DarkOrchid',  // fri [4] 9932CC
    'DarkRed',  // sat/su [5] 8B0000
    'gray'  // for async sections [6]
  ]

  static dayBrightenedColors: string[] = [
    '#ff9f64',
    '#ffebd3',
    '#81e8b4',
    '#26acff',
    '#b33fd9',
    '#cc1818',
    '#a0a0a0',
  ]

  // text colors of the XX:XX-XX:XX elements in the course section list
  // the alternate shade is automatically determined - don't worry about it.
  static dayColorText: string[] = [
    'black',  // mon
    'black',  // tues
    'black',
    'white',
    'white',  // fri
    'white',  // sat/su
    'white'   // for async sections
  ]
}
