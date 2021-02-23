export const navBarView = (user) => {

}

export const announcementView = (announcement) => {
    let isSale = '';
    if (announcement.sale === true) {
        isSale = 'venta'
    } else {
        isSale = 'compra'
    }

    
  let imgHTML = '';
  if (announcement.image) {
    imgHTML = `<img class="card-img-top"
    src="${announcement.image}"
    alt="Card image cap">
`;
  } else {
    imgHTML = `<img class="card-img-top"
    src="https://picsum.photos/id/237/100/100"
    alt="Card image cap">
`; 
  }
    return `
    <div class="card" style="width: 14rem; ">
        ${imgHTML}
        <div class="card-body">
            <h5 class="card-title">${announcement.name}</h5>
            <p><strong>price:</strong> ${announcement.price} € </p>
            <p>${isSale}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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