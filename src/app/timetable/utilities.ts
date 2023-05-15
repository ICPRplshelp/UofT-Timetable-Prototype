// I get it. lowercase class name.
export class utilities {
  // colors associated with breadth requirements
  static brColors: string[] = [
    '#474545',
    '#d71a1a',
    '#55E6CA',
    '#f7c959',
    '#B6E364',
    '#af4aed',
  ];

  // colors associated with the background of courses based on course level (100, 200, 300, 400)
  static levelColors: string[] = [
    '#444444',  // 0-level
    '#6F9E00',
    //  '#02ad23',  // 100-level
    '#3694ff',
    '#9436ff',
    '#D93D00',
    // '#E02D00',
    // '#f53d00',  // 400-level
    '#5454e8',  // 500-level
    "#78630e", // 600-level,
    "#85462c" // 700-level
  ];

  static tableSessionColors: string[] = [
    '#ffd3a4',  // fall
    '#a6f1ff',  // winter
    '#d5abff'   // year
  ]

  // background colors of the XX:XX-XX:XX elements in the course section list
  static dayColors: string[] = [
    '#ff9f64',  // mon [0] FF7F50 ff9f64
    'bisque',  // tues [1] FFE4C4
    '#67e09b',  // wed [2] 67e09b
    'DodgerBlue',  // thurs [3] 1E90FF
    'DarkOrchid',  // fri [4] 9932CC
    'DarkRed',  // sat/su [5] 8B0000
    'gray'  // for async sections [6]
  ]

  static dayBrightenedColors: string[] = [
    '#FFB43F',
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
