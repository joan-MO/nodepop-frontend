import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class DeleteController extends BaseController {
    
    constructor(element, announcement) {
        super(element);
        this.element.addEventListener('click', async ev => {
            const deleteConfirmed = confirm('¿Seguro que quieres borrarlo?');
            if (deleteConfirmed) {
                await dataService.deleteAnnouncement(announcement);
                window.location.href = '/?message=deleteOK';
            }
        })
    }

}
