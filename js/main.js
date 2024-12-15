let listArray=document.querySelectorAll(".list ul li");
let list=document.querySelector(".list ul");
let filtersArray=document.querySelectorAll(".filters li");
let browsePage=document.querySelector(".browse");
let filtersDiv=document.querySelector(".filters");
let moviesContainer=document.querySelector(".movies");
localStorage.clear();
fetch("https://moviesb.tryasp.net/api/movies").then(res=>res.json())
.then(data=>{
    let filterArray=[];
    let filterValue="Drama";
    function getFilterArray(filterValue){
        data.forEach(element => {
            element.genre.forEach(item => {
                if(item ==filterValue){
                    filterArray.push(element);
                }
            });
        });
        addarraytomoviecontainer(filterArray,filterValue);
        
    }
    getFilterArray(filterValue);
    filtersDiv.addEventListener("click",(e)=>{
        if(e.target.classList.contains("col-3")){
            filterArray=[];
            removeActiveClass(filtersArray);
            e.target.classList.add("active");
            filterValue=e.target.title;
        }
        getFilterArray(filterValue);
        addarraytomoviecontainer(filterArray,filterValue);
    });
    moviesContainer.addEventListener("click",((e)=>{
        if(e.target.classList.contains("poster")){
            let movieId=e.target.parentElement.id;
            // console.log(movieId);
            openMoviePage(movieId);
        }
    }))
});
//add array to page
function addarraytomoviecontainer(array,value){
    moviesContainer.innerHTML="";
    let title=document.createElement("h1");
    title.className="mb-4";
    title.innerHTML=`Trending in ${value}`;
    moviesContainer.appendChild(title);
    let cardsContainer=document.createElement("div");
    cardsContainer.className="cards row";
    array.forEach(element => {
        let card=document.createElement("div");
        card.className=`movie-card card col-lg-3 col-md-4 col-sm-4 col-6 mb-4 id`;
        card.setAttribute("id",element.id);
        let poster=document.createElement("img");
        poster.className="poster";
        poster.setAttribute("src",element.poster);
        poster.setAttribute("loading","lazy");
        card.appendChild(poster);
        let cardTitle=document.createElement("h4");
        cardTitle.className="mt-2"
        cardTitle.innerHTML=element.title;
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
        rate.innerHTML=element.rating;
        ratingDiv.appendChild(rate);
        let dateDiv=document.createElement("div");
        let date=document.createElement("span");
        date.className="date";
        date.innerHTML=element.releaseDate.slice(0,4);
        dateDiv.appendChild(date);
        infoDiv.appendChild(ratingDiv);
        infoDiv.appendChild(dateDiv);
        card.appendChild(infoDiv);
        cardsContainer.appendChild(card)
        moviesContainer.appendChild(cardsContainer);
    });
    browsePage.appendChild(moviesContainer);
}
//remove active class from list
function removeActiveClass(array){
    array.forEach(element => {
        if(element.classList.contains("active")){
            element.classList.remove("active");
        }
    });
}
//add active class when click
list.addEventListener("click",(e)=>{
    if(e.target.classList.contains("link")){
        removeActiveClass(listArray);
        e.target.classList.add("active");
    }
});
filtersDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("col-3")){
        removeActiveClass(filtersArray);
        e.target.classList.add("active");
    }
});
function openMoviePage(id){
    setLocalStorageId(id);
let w=window.open("./movie.html","_self");
}
function setLocalStorageId(id){
    localStorage.clear();
    window.localStorage.setItem("movieId",id);
}