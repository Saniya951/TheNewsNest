import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }; 

  const updateNews = async ()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url); //async func waits in apne body to(untill) resolve some promises
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);

    setArticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setLoading(false)
    
    props.setProgress(100);
  }

  // taking data from API
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsApp`;
    updateNews();
    
  },[])
  
  
//   const handlePrevClick = async () => {
//     setPage(page-1);
//     updateNews();
//   };

//   const handleNextClick = async () => {
//     setPage(page+1);
//     updateNews();
//   };

  const fetchMoreData =async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey }&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    // setLoading(true);
    let data = await fetch(url); //async func waits in apne body to(untill) resolve some promises
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults);
    
  };

    return (
      <div className="container my-3">
       
        {/* {loading && <spinner/>}  says that if this.state.loading is true then show spinner */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<spinner/>}
        >
            <div className="container">
            <h1 className="text-center" style={{ margin: "35px 0px;",marginTop: "30px;",fontSize:'30px;'}}>He</h1>
                <div className="row">
                <h1 className="text-center" style={{ margin: "35px 0px;",marginTop: "80px;"}}>
                News- Top {capitalizeFirstLetter(props.category)}{" "} Headlines</h1>
                    {/* for INIFINITE SCROLL */}
                    {articles.map((element) => {
                    return (
                        <div className="col-md-3" key={element.url}>
                        <NewsItem
                            title={element.title ? element.title.slice(0, 45) : ""}
                            description={
                            element.description
                                ? element.description.slice(0, 88)
                                : ""
                            }
                            imageurl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}
                        />
                        </div>
                    );
                    })}

                </div>
            </div>
        </InfiniteScroll>
      </div>
    );
  
}

News.defautProps = {
    country: "in",
    pagesize: 8,
    category: "general ",
  };
News.propTypes = {
    country: PropTypes.string,
    pagsSize: PropTypes.number,
    category: PropTypes.string,
  };


export default News;
