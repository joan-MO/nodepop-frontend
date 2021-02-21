export const announcementView = (announcement) => {
    return `
    <div class="card" style="width: 14rem; ">
        <img class="card-img-top"
            src="https://picsum.photos/id/237/100/100"
            alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${announcement.name}</h5>
            <p class="card-text">Some quick example text to
                build on the card title and make up the bulk
                of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
`
} 