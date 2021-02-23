import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";


export default class LoginController extends BaseController {
  constructor(element) {
    super(element);
    this.attachEventListener();
  }

  attachEventListener() {
    this.element.addEventListener("submit", async (event) => {
      event.preventDefault();
      const user = {
        username: this.element.elements.email.value,
        password: this.element.elements.password.value,
      };
      this.publish(this.events.START_LOADING);
      try {
        const data = await dataService.login(user);
        dataService.saveToken(data.accessToken);
        let next = '/';
        const queryParams = window.location.search.replace('?', ''); 
        const queryParamsParts = queryParams.split('=');
        if (queryParamsParts.length >= 2 && queryParamsParts[0] === 'next') {
          next = queryParamsParts[1];
        }
        window.location.href = next;
      } catch (error) {
        this.publish(this.events.ERROR, error);
      } finally {
        this.publish(this.events.FINISH_LOADING);
      }
    });

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
    });
  }
}
