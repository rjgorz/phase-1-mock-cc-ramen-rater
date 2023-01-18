// write your code here
document.addEventListener('DOMContentLoaded', () => {
    getRamenImages();
})

// const deleteBtn = document.createElement('button');
// const br = document.createElement('br');
// deleteBtn.setAttribute('id', 'deleteBtn');
// deleteBtn.textContent = "Delete";
// deleteBtn.addEventListener('click', () => {
// });
// document.querySelector('#ramen-detail').append(br, deleteBtn);

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

const newForm = document.querySelector('#new-ramen');
newForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    addNewRamen(newRamen);
    newForm.reset();
});

const editForm = document.querySelector('#edit-ramen');
editForm.addEventListener('submit', e => {
    e.preventDefault();
    const editedRamen = {
        name: document.querySelector('.name').textContent,
        restaurant: document.querySelector('.restaurant').textContent,
        image: document.querySelector('.detail-image').src,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    renderRamenDetails(editedRamen);
    editForm.reset();
})

function addNewRamen(ramen) {
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramen)
    })
    .then(res => res.json())
    .then(ramen => renderRamenImages([ramen]))
}

// function updateRamen(ramen) {
//     console.log(ramen);
//     fetch(`http://localhost:3000/ramens/${ramen.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(ramen)
//     })
//     .then(res => res.json())
//     .then(ramen => renderRamenDetails(ramen));
// }