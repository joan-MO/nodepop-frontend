import BaseController from './BaseController.js';
export default class AnnoucementByIdController extends BaseController {
    
    constructor(element, announcement) {
        super(element);        
        this.element.addEventListener('click', async ev => {
            window.location.href ="/announcement-detail.html?id=" + announcement.id;  
        })
    } 
}
