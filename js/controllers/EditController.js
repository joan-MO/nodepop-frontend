import DataService from "../services/DataService.js";
import BaseController from "./BaseController.js";

export default class EditController extends BaseController {
    constructor(element,editButton, deleteButton, announcement) {
        super(element)

        const sendButton = element.querySelector('.send');
        const cancelButton = element.querySelector('.cancel');
        
        const cardBody = element.querySelector('.card-body');
        const img = element.querySelector('img');
        const card = element.querySelector('.card')
        const title = element.querySelector('.card-title');
        const price = element.querySelector('.price');
        const priceElement = element.querySelector('p');
        
        let inputTitle;
        let inputPrice;
        let labelFile;
        let imgInput;
        let formElement;

        editButton.addEventListener('click', () =>{

            inputTitle = document.createElement('input');
            inputPrice = document.createElement('input');
            labelFile = document.createElement('label');
            imgInput = document.createElement('input');
            formElement = document.createElement('form');

            deleteButton.classList.add('is-hidden');
            editButton.classList.add('is-hidden');
            sendButton.classList.remove('is-hidden');
            cancelButton.classList.remove('is-hidden');

            cancelButton.addEventListener('click', () => {
                location.reload();  
            })
          
            labelFile.setAttribute('for', 'file-input');
            imgInput.setAttribute('id', 'file-input');
            imgInput.setAttribute('type', 'file');
            imgInput.style.display = 'none';
            imgInput.setAttribute('accept', 'image/*')

            card.prepend(labelFile);
            card.prepend(imgInput);
            card.prepend(formElement)
            formElement.appendChild(imgInput);
            labelFile.appendChild(img)


            inputTitle.setAttribute('type', 'text');
            inputTitle.setAttribute('class', 'card-title form-control');
            inputTitle.setAttribute('maxlength', '30')
            inputTitle.setAttribute('name', 'title');

            inputPrice.setAttribute('type', 'number')
            inputPrice.setAttribute('class', 'form-control')
            inputPrice.setAttribute('step', '0.01')
            inputPrice.setAttribute('min', '0')
            inputPrice.setAttribute('name', 'price');
  
            cardBody.prepend(inputPrice)
            cardBody.prepend(inputTitle)
            console.log(title.title);

      
            inputTitle.value = title.innerHTML
            inputPrice.value = parseFloat(price.innerHTML)
           
            title.classList.add('is-hidden')
            priceElement.classList.add('is-hidden');
            price.classList.add('is-hidden')

            sendButton.addEventListener('click', () =>{
                this.editAnnouncement(announcement, inputTitle, inputPrice, imgInput);
            })   

         })

    }

    async editAnnouncement(announcement, title, inputPrice, imgInput) {
        try {
            const announcementData = {
                name: title.value || announcement.name,
                sale: announcement.sale,
                price: inputPrice.value || announcement.price,
                tags: announcement.tags,
                photo: imgInput.files[0] || announcement.image
            }
            await DataService.editAnnouncement(announcement.id, announcementData);
            window.location.href = '/?message=editOK'
    
        } catch (error) {
            this.publish(this.events.ERROR, error);
        }
     
    }
}