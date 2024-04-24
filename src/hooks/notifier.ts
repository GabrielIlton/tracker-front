import { NotificationTypes } from "@/interfaces/INotification"
import { NOTIFICATION } from "@/store/mutation-types"
import { store } from "@/store"

type Notifier = {
  notify: (type: NotificationTypes, title: string, text: string) => void
}

export default () : Notifier => {
  const notify = (type: NotificationTypes, title: string, text: string): void => {
    store.commit(NOTIFICATION, { title, text, type });
  }

  return { notify }
}
