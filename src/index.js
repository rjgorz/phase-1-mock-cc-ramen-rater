// write your code here
document.addEventListener('DOMContentLoaded', () => {
    getRamenImages();
})

function getRamenImages() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
        renderRamenImages(ramens);
        renderRamenDetails(ramens[0]);
    });
}

function renderRamenImages(ramens) {
    ramens.forEach(ramen => {
        const ramenContainer = document.querySelector('#ramen-menu');
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => {
            renderRamenDetails(ramen);
        });

        ramenContainer.append(img);
    })
}

function renderRamenDetails(ramen) {
    const ramenImg = document.querySelector('.detail-image');
    const ramenName = document.querySelector('.name');
    const ramenRestaurant = document.querySelector('.restaurant');
    const ramenRating = document.querySelector('#rating-display');
    const ramenComment = document.querySelector('#comment-display');

    ramenImg.src = ramen.image;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
}

const form = document.querySelector('#new-ramen');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    renderRamenImages([newRamen]);
    form.reset();
});