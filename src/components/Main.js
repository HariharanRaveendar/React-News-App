import {useState,useEffect} from 'react';


function Main(){

    const [articles,setArticles] = useState([]);
    const [search,setSearch]=useState("")

    useEffect(()=>{

        let url="https://newsapi.org/v2/everything?q=microsoft&apiKey=86dcf796a46449028c9e25b58a227c12"

        fetch(url)
        .then((response) => response.json())
        .then((news )=> {
            console.log(news.articles)
            setArticles(news.articles);
        })
        
    },[])

    function readValue(value){
        setSearch(value);
    }

    function searchNews(){
        if(search.length ===0){
            alert("Please Give some input to search");
        }else{
            let url=`https://newsapi.org/v2/everything?q=${search}&apiKey=86dcf796a46449028c9e25b58a227c12`
            fetch(url)
            .then((response) => response.json())
            .then((news )=> {
                console.log(news.articles)
                setArticles(news.articles);
            })
    

        }
    }

    return(
   <section class="dark">
      <div class="container py-4">
      <div class="input-group mb-3">
            <input type="search" onChange={(event)=>{readValue(event.target.value)}} class="form-control" placeholder="Search the data" aria-label="Search the data" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" onClick={searchNews} type="button">Button</button>
            </div>
            </div>
         <h1 class="h1 text-center" id="pageHeaderTitle">All news</h1>
         {
        articles.length===0?(<h2>No Data Found</h2>):
        articles.map((article,index) => (
         <article class="postcard dark blue"  key={index}>
            <a class="postcard__img_link" href="#">
            <img class="postcard__img" src={article.urlToImage} alt="Image Title" />
            </a>
            <div class="postcard__text">
               <h1 class="postcard__title blue">{article.title}</h1>
               <div class="postcard__subtitle small">
                  <time datetime="2020-05-25 12:00:00">
                  <i class="fas fa-calendar-alt mr-2"></i>{article.author}
                  </time>
               </div>
               <div class="postcard__bar"></div>
               <div class="postcard__preview-txt">
               {article.description}
                  </div>
               <ul class="postcard__tagbox">
                  <li class="tag__item play blue">
                     <a href={article.url}><i class="fas fa-play mr-2"></i>Read full Article</a>
                  </li>
               </ul>
            </div>
         </article>
         ))}
      </div>
   </section>
)}

export default Main;