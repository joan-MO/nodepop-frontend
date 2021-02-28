export const navBarView = (user) => {

}

export const announcementView = (announcement) => {

  let buttonDetail;

    let isSale = '';
    if (announcement.sale === true) {
        isSale = 'venta'
    } else {
        isSale = 'compra'
    }   


      if (announcement.canBeDeleted && announcement.canBeEdit) {
        buttonDetail = `<button type="submit" class="btn btn-success send is-hidden">Acceptar</button>
        <button class="btn btn-primary cancel is-hidden">Cancel</button>
        <button class="btn btn-warning edit">Edit</button>
        <button class="btn btn-danger delete ml-2">Delete</button>`
       
      } else {
      buttonDetail = '';
      }
    
    
  let imgHTML = '';
  if (announcement.image) {
    imgHTML = `<img class="card-img-top rounded mx-auto"
    src="${announcement.image}"
    alt="Card image cap" width='200' height='200'>
`;
  } else {
    imgHTML = `<img class="card-img-top rounded mx-auto"
    src="https://picsum.photos/id/237/100/100"
    alt="Card image cap" width='200' height='200'>
`; 
  }
    return `
    <div class="card content" style="width: 14rem; ">
        ${imgHTML}
        <div class="card-body">
            <h5 class="card-title">${announcement.name}</h5>
            <p class="price">${announcement.price} €</p>
            <p>${isSale}</p>
           ${buttonDetail}
        </div>
    </div>
`
}

export const errorView = (errorMessage) => {
  
    return `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Error</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class='icon-close'>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>${errorMessage}</p>
        </div>
      </div>
    </div>`
}