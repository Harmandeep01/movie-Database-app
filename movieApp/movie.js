const API_LINK = "http://localhost:8000/api/v1/reviews/";

const url = new URL(location.href);

const  movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title")

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerHTML = movieTitle

const cretaeReviewDiv = document.createElement('div');
cretaeReviewDiv.innerHTML = ` <div class="row">
        <div class="col">
            <div class="card">
                New Review
                <p><strong>Review: </strong>
                <input type="text" id="new_review" value="" placeholder="Write your review"></p>
                <input type="text" id="new_user" value="" placeholder="Enter your user name"></p>
                <a href="#" onclick="createReview(${movieId})">Post Review</a>
            </div>
        </div>
    </div>`


main.appendChild(cretaeReviewDiv)
returnReviews(API_LINK);

 function returnReviews(url) {
    console.log((url + "movie/" + movieId))
   fetch(url + "movie/" + movieId)
//   console.log(url + "movie/" + movieId)
    .then((res) => res.json())
    .then(function(data){

      console.log(data)
      
      const div_row = document.createElement("div");
      div_row.setAttribute("class", "row");

      if(data.reviews === '' || data.reviews.length === 0) {
        div_row.innerHTML = 
        `<div class="col"> 
            <p>No reviews yet</p>
        </div>`
      }else{
        data.reviews.forEach((review) => {
        div_row.innerHTML = `
        <div class="col">
        <div class="card" id="${review._id}">
                <p><Strong>Review: </Strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">✏️</a>
                    <a href="#" onclick="deleteReview('${review._id}')">🗑️</a></p>
            </div>
        </div>`;
    })}
        main.appendChild(div_row);
    })
}

 function createReview(id){

   const newReview = document.getElementById("new_review").value;
    const newUser = document.getElementById("new_user").value;

    fetch(API_LINK + "new", {
        method :'POST',
        headers : {
            'Accept' : 'application/json, text/plain */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({"movieId" : id, "user" : newUser, "review" : newReview})
    }).then(res => res.json())
    .then( res => {
        console.log(res)
        location.reload();
    })
    }

function editReview(id, review, user){
    const element = document.getElementById(id);

    const reviewInputId = 'review' + id;
    const userInputId = 'user' + id;

    element.innerHTML = `
        <p><Strong>Review: </Strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
                <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a>
        </p>`
}


function saveReview(reviewInputId, userInputId, id){

    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    fetch(API_LINK + id, {
        method :'PUT',
        headers : {
            'Accept' : 'application/json, text/plain */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({"user" : user, "review" : review})
    }).then(res => res.json())
    .then( res => {
        console.log(res)
        location.reload();
    })
}

function deleteReview(id){
    fetch(API_LINK + id, {
        method : 'DELETE',
        headers : {
            'Accept' : 'application/json, text/plain */*',
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    })
}