export enum Speaker {
  Teacher = '교사',
  Student = '학생',
}

export interface Message {
  speaker: Speaker;
  text: string;
}
