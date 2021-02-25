import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class DeleteController extends BaseController {
    
    constructor(element, announcement) {
        super(element);
        this.element.addEventListener('click', async ev => {
            const deleteConfirmed = confirm('¿Seguro que quieres borrarlo?');
            if (deleteConfirmed) {
                await dataService.deleteAnnouncement(announcement);
                this.publish(this.events.TWEET_DELETED, announcement);
                window.location.href = 'http://localhost:3000/index.html';
            }
        })
    }

}
