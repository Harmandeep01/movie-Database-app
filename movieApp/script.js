const API_LINK = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=YOUR_API_KEY'
const IMG_PATH = 'https://image.tmdb.org/t/p/original/'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=YOUR_API_KEY'

const main = document.getElementById("section")
const form = document.getElementById("form")
const search = document.getElementById("query")

returnMovies(API_LINK)

async function  returnMovies(url){
    await fetch(url)
    .then(res => res.json())
    .then(function(data){
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
        
        data.results.forEach(element => {
            

            const div_col = document.createElement('div');
            div_col.setAttribute('class', 'col');

            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            
            const center = document.createElement('center')

            const img = document.createElement('img');
            img.setAttribute('class', 'thumbnail');
            img.setAttribute('id', 'img');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

        
            title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}&overview=${element.overview}">Reviews</a>`;
            img.src = IMG_PATH + `${element.poster_path}`;

            center.appendChild(img);
            div_card.appendChild(center)
            div_card.appendChild(title)
            div_col.appendChild(div_card);
            div_row.appendChild(div_col);
            main.appendChild(div_row)
            
        });    
    })
}

form.addEventListener('submit', (e => {
    e.preventDefault();
    main.innerHTML = ''

    const search_item = search.value;

    if(search_item){
        returnMovies(`https://api.themoviedb.org/3/search/movie?query=${search_item}&api_key=YOUR_API_KEY`);
        search.value = '';
    }
}))
