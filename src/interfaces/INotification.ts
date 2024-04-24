export enum NotificationTypes {
  SUCCESS,
  FAILED,
  WARNING
}

export default interface IProject {
  title: string,
  text: string,
  type: NotificationTypes,
  id: number
}