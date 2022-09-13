import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3 ">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "84%", zindex: "1", fontSize: "1.1rem" }}>
            {source}
          </span>
          <img src={imageUrl?imageUrl:"https://st1.bgr.in/wp-content/uploads/2022/06/Spyware.jpg"}
            className="card-img-top"
            alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">BY {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark"> Read More </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
