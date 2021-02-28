import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { announcementView} from '../views/views.js';
import DeleteController from './DeleteController.js';
import EditController from './EditController.js';

export default class AnnoucementDetailController extends BaseController {
    
    render(announcement) {
       
        const col4 = document.createElement('div');
        col4.setAttribute('class', 'd-flex justify-content-center col-12 mt-5');
        col4.innerHTML = announcementView(announcement);
        const deleteButton = col4.querySelector('.delete');
        const editButton = col4.querySelector('.edit');

        if (editButton) {
            new EditController(col4, editButton, deleteButton, announcement)
        }      

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