
import BaseController from "./BaseController.js";
import DataService from "../services/DataService.js"
import { announcementView } from "../views/views.js";


export default class AnnouncementController extends BaseController {
    render(announcements) {
        for (const announcement of announcements) {
            const col4 = document.createElement('div');
            col4.setAttribute('class', 'col-xs-4 ml-auto')
            col4.innerHTML = announcementView(announcement);
            this.element.appendChild(col4);
            console.log(announcement);
        }
    }

    navBar(user) {
        console.log(user);
    }

     async loadAnnouncements() {
        this.publish(this.events.START_LOADING, {});
        try {
            const announcements = await DataService.getAnnouncements(); 
            this.render(announcements);
            console.log(announcements);
        } catch (error) {
            console.error('error', error)
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}
