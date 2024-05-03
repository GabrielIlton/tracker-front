export enum NotificationTypes {
  SUCCESS,
  FAILED,
  WARNING
}

export default interface INotification {
  title: string,
  text: string,
  type: NotificationTypes,
  id: number
}