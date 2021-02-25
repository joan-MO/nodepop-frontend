import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { announcementView} from '../views/views.js';
import DeleteController from './DeleteController.js';

export default class AnnoucementDetailController extends BaseController {
    
    render(announcement) {
        const col4 = document.createElement('article');
        col4.innerHTML = announcementView(announcement);
        const deleteButton = col4.querySelector('button');
        if (deleteButton) {
                new DeleteController(deleteButton, announcement);
        }
        this.element.appendChild(col4);
    }

    async loadAnnouncementById() {
        this.publish(this.events.START_LOADING, {});
        try {
            const queryParams = window.location.search.replace('?', '');
            const queryParamsParts = queryParams.split('=');
            const id = queryParamsParts[1]
            const announcement = await dataService.getAnnouncementById(id);
            this.render(announcement);
        } catch (error) {
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
   
    }
}