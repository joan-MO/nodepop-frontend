import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class NewAnnouncementController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/add-announcement.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }
    attachEventListeners() {

        
        this.element.querySelectorAll("input").forEach((input) => {
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", (event) => {
              if (input.validity.valid) {
                input.classList.add("is-success");
                input.classList.remove("is-danger");
              } else {
                input.classList.remove("is-success");
                input.classList.add("is-danger");
              }
      
              if (this.element.checkValidity()) {
                button.removeAttribute("disabled");
              } else {
                button.setAttribute("disabled", true);
              }
            });
          })
        this.element.addEventListener('submit', async event => {
            event.preventDefault();
            
            const announcement = {
                name: this.element.elements.name.value,
                sale: Boolean(this.element.elements['is-sale'].value),
                price: parseFloat(this.element.elements.price.value),
                tags: this.element.elements.tags.value,
                photo: null
            }

            console.log(announcement);
            
            if (this.element.elements.image.files.length > 0) {
                announcement.photo = this.element.elements.image.files[0];
            }
            
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveAnnouncement(announcement);
                window.location.href = '/?message=announcementOk'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });
    }

}
