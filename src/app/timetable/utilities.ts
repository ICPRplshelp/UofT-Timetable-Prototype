// I get it. lowercase class name.
export class utilities {
  // colors associated with breadth requirements
  static brColors: string[] = [
    '#797979',  // no breath requirement
    '#d71a1a',  // br1
    '#34e7ff',
    '#ffd300',
    '#0ddc09',
    '#bb4bff'   // br5
  ];

  // colors associated with the background of courses based on course level (100, 200, 300, 400)
  static levelColors: string[] = [
    '#444444',  // 0-level
    '#00c427',  // 100-level
    '#52b1ff',
    '#9436ff',
    '#ff6600'  // 400-level
  ]

  static tableSessionColors: string[] = [
    '#ffd3a4',  // fall
    '#a6f1ff',  // winter
    '#d5abff'   // year
  ]

  // background colors of the XX:XX-XX:XX elements in the course section list
  static dayColors: string[] = [
    'Coral',  // mon [0]
    'bisque',  // tues [1]
    '#67e09b',  // wed [2]
    'DodgerBlue',  // thurs [3]
    'DarkOrchid',  // fri [4]
    'DarkRed',  // sat/su [5]
    'gray'  // for async sections [6]
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
