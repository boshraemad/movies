let movieId=window.localStorage.getItem("movieId");
let movieContainer=document.querySelector(".movie-container");
movieContainer.className="movie-container container-fluid  d-flex align-items-center justify-content-center"
fetch(`https://moviesb.tryasp.net/api/movies/${movieId}`).then(res=>res.json())
.then(movie=>{
    console.log(movie.trailer);
    movieLayout(movie);
})
function movieLayout(movie){
    let container=document.createElement("div");
    container.className="container row";
    let posterContainer=document.createElement("div");
    posterContainer.className="poster-container col-xl-5 col-md-12 text-center";
    let moviePoster=document.createElement("img");
    moviePoster.setAttribute("src",movie.poster);
    posterContainer.appendChild(moviePoster);
    container.appendChild(posterContainer);
    let detailsContainer=document.createElement("div");
    detailsContainer.className="details-container col-xl-5 col-md-12";
    let movieTitle=document.createElement("h1");
    movieTitle.className="movie-title";
    movieTitle.innerHTML=movie.title;
    detailsContainer.appendChild(movieTitle);
    let language=document.createElement("p");
    language.innerHTML=`Language: ${movie.language}`;
    language.className="language";
    detailsContainer.appendChild(language);
    let details=document.createElement("p");
    details.className="details";
    details.innerHTML=movie.synopsis;
    detailsContainer.appendChild(details);
    let genreList=document.createElement("ul");
    genreList.className="genre-list row";
    movie.genre.forEach(element => {
        let li=document.createElement("li");
        li.innerHTML=element;
        li.className="col-3";
        genreList.appendChild(li)
    });
    detailsContainer.appendChild(genreList);
    let trailer=document.createElement("a");
    trailer.className="trailer-link";
    trailer.setAttribute("href","#trailer");
    trailer.setAttribute("target","_self");
    trailer.innerHTML="Watch Trailer <i class='fa-solid fa-play'></i>";
    detailsContainer.appendChild(trailer);
    container.appendChild(detailsContainer);
    let videoTrailer=document.createElement("div");
    videoTrailer.className=" video col-12 d-flex align-items-center justify-content-center";
    videoTrailer.id="trailer";
    videoTrailer.innerHTML=`<iframe width="90%" height="100%" src=${movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    // videoTrailer.className="video";
    // videoTrailer.setAttribute("src",movie.trailer);
    // videoTrailer.setAttribute("width",300);
    // videoTrailer.setAttribute("height",300);
    container.appendChild(videoTrailer);
    movieContainer.appendChild(container);
}