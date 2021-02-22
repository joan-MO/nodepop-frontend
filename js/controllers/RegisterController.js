import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class RegisterController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    async makePost (user) {
        await dataService.registerUser(user);
        alert('Usuario creado con éxito!');
        window.location.href = '/login.html';  
    }

    checkInputErrors() {
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            if (input.validity.valid ) {
                input.classList.add('border-success');
                input.classList.remove('border-danger');
            } else {
                input.classList.remove('border-success');
                input.classList.add('border-danger');
            }

            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });
    }

    attachEventListener() {

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();  // evita que se enví el formulario (comportamiento por defecto)
            const user = {
                username: this.element.elements.email.value,
                password: this.element.elements.password.value
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makePost(user);
            } catch(error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', event => { 
                this.checkInputErrors();
            });
        });

        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', event => { 
                const passInput = this.element.elements['password'];
                const passConfirmInput = this.element.elements['confirm-password'];
                if (passInput.value !== passConfirmInput.value) {
                    passInput.setCustomValidity('Las password no coinciden'); // marco el input como erróneo
                    passConfirmInput.setCustomValidity('Las password no coinciden'); // marco el input como erróneo
                } else {
                    passInput.setCustomValidity(''); // el input está ok
                    passConfirmInput.setCustomValidity(''); // el input está ok
                }
                this.checkInputErrors();
            });
        })

    }

}