
import BaseController from "./BaseController.js";
import DataService from "../services/DataService.js"
import { announcementView} from "../views/views.js";
import AnnoucementByIdController from "./AnnoucementByIdController.js";


export default class AnnouncementController extends BaseController {

    
    constructor(element) {
        super(element);
        this.subscribe(this.events.SEARCH, query => {
            console.log(query);
            this.loadAnnouncements(query);
        });
    }


    render(announcements) {
        this.element.innerHTML = '';
        if(announcements.length === 0){
            const col4 = document.createElement('p');
            col4.style.color = 'red';
            col4.innerHTML = 'Not result';
            this.element.appendChild(col4);
         
        } 
        for (const announcement of announcements) {

            const col4 = document.createElement('div');
            col4.setAttribute('class', 'col-xs-4 ml-auto');
            col4.innerHTML = announcementView(announcement);
           
            new AnnoucementByIdController(col4, announcement)
            this.element.appendChild(col4);
            
        }

    

    }

    navBar(user) {
        console.log(user);
    }

     async loadAnnouncements(query=null) {
        this.publish(this.events.START_LOADING, {});
        try {
            const announcements = await DataService.getAnnouncements(query);
            
            this.render(announcements);
        } catch (error) {
            console.error('error', error)
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}
