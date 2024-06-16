import React from 'react'

const NewsItem = (props) =>{
  
    // newsUrl will uniquley find every news
    let {title,description,imageurl,newsUrl,author, date,source} = props;
    return (
      <div>
        <div className="my-4">
            <div className="card">
                {/* if image is null then */}
                <img src={imageurl?imageurl:"https://c.ndtvimg.com/2024-01/hrun5rco_healthy-heart_625x300_18_January_24.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span class="badge text-bg-secondary">{source}</span>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>  {/*target="_blank" used to open in new tab*/}
                </div>
            </div>
        </div> 
      </div>
    ) 
  
}

export default NewsItem
