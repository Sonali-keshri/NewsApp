import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8, 
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
      }

      capitalFLetter =(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = `DailyNews: ${this.capitalFLetter(this.props.category)}`;
    }

    async componentDidMount(){ 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d7f2ba3f9d84cd1a7be9ee50137e22a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false})
    }

     handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d7f2ba3f9d84cd1a7be9ee50137e22a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }
    
     handleNextClick = async ()=>{
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
          
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d7f2ba3f9d84cd1a7be9ee50137e22a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json() 
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
    }
        }

    render() { 
        return (
              <div className="container my-3">
               <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top {this.capitalFLetter(this.props.category)} Headlines</h1>
               {this.state.loading && <Spinner/>}
               <div className="row"> 
               {!this.state.loading && this.state.articles.map((element)=>{
                   return <div className="col-md-3" key={element.url}>
                       <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                   </div> 
               })} 
               </div> 
               <div className="container d-flex justify-content-between">
               <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
               <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
               </div>
           </div>
        )
    }
}

export default News

