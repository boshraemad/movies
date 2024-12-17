window.localStorage.removeItem("movieId");
let array=window.localStorage.getItem("watchList");
let list=JSON.parse(array);
let moviesContainer=document.querySelector(".movies-container");
fetch("https://moviesb.tryasp.net/api/movies").then(res=>res.json())
.then(data=>{
    // console.log(list);
    addarraytomoviecontainer(data,list);
    moviesContainer.addEventListener("click",((e)=>{
        if(e.target.classList.contains("poster")){
            let movieId=e.target.parentElement.id;
            // console.log(movieId);
            openMoviePage(movieId);
        }
    }))
})
//add array to page
function addarraytomoviecontainer(data,array){
    moviesContainer.innerHtml="";
    let cardsContainer=document.createElement("div");
    cardsContainer.className="cards row";
    array.forEach(element => {
        let card=document.createElement("div");
        card.className=`movie-card card col-lg-3 col-md-4 col-sm-4 col-6 mb-4 id`;
        card.setAttribute("id",element);
        let poster=document.createElement("img");
        poster.className="poster";
        poster.setAttribute("src",data[element-1].poster);
        poster.setAttribute("loading","lazy");
        card.appendChild(poster);
        let cardTitle=document.createElement("h4");
        cardTitle.className="mt-2"
        cardTitle.innerHTML=data[element-1].title;
        card.appendChild(cardTitle);
        let infoDiv=document.createElement("div");
        infoDiv.className="d-flex align-items-center gap-2";
        let ratingDiv=document.createElement("div");
        ratingDiv.className="rating d-flex align-items-center gap-2";
        let icon=document.createElement("span");
        icon.className="star";
        icon.innerHTML="<i class='fa-solid fa-star'></i>";
        ratingDiv.appendChild(icon);
        let rate=document.createElement("span");
        rate.innerHTML=data[element-1].rating;
        ratingDiv.appendChild(rate);
        let dateDiv=document.createElement("div");
        dateDiv.className="date-div";
        let date=document.createElement("span");
        date.className="date";
        date.innerHTML=data[element-1].releaseDate.slice(0,4);
        dateDiv.appendChild(date);
        infoDiv.appendChild(ratingDiv);
        infoDiv.appendChild(dateDiv);
        card.appendChild(infoDiv);
        cardsContainer.appendChild(card)
        moviesContainer.appendChild(cardsContainer);
    });
}
//open movie
function openMoviePage(id){
    setLocalStorageId(id);
let w=window.open("./movie.html","_self");
}
function setLocalStorageId(id){
    // localStorage.removeItem("movieId");
    window.localStorage.setItem("movieId",id);
}