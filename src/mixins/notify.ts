import { NotificationTypes } from "@/interfaces/INotification";
import { NOTIFICATION } from "@/store/mutation-types";
import { store } from "@/store";


export const notifyMixin = {
  methods: {
    notifyMixin(type: NotificationTypes, title: string, text: string): void {
      store.commit(NOTIFICATION, { title, text, type });
    }
  }
}