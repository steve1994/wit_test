import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadArticleList} from '../actions';
import parse from 'html-react-parser';

class MainNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {limit:6,page:1}
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleClickPage = this.handleClickPage.bind(this);
    }

    componentDidMount() {
        let defaultLimit = 6;
        let defaultPage = 1;
        this.props.loadArticleList(defaultPage,defaultLimit);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page != prevState.page) {
            this.props.loadArticleList(this.state.page,this.state.limit);
        }
    }

    handleClickPrevious(e) {
        e.preventDefault();
        if (this.state.page-1 > 0) {
            this.setState({page:this.state.page-1});
        }
    }

    handleClickNext(e) {
        e.preventDefault();
        let maximumPage = 3;
        if (this.state.page + 1 <= maximumPage) {
            this.setState({page:this.state.page+1});
        }
    }

    handleClickPage(numPage) {
        this.setState({page:numPage});
    }

    render() {

        // Generate List of News and render it to each View
        let listNewsElement = this.props.news.map((item,index) => {
            return (
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={item.image} />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="news-content">
                                                <Link to={`detail/${item.id_artikel}`}><h2>{item.judul_artikel}</h2></Link>
                                                {parse(item.summary)}
                                            </div>
                                            <div className="news-footer">
                                            <div className="news-author">
                                                <ul className="list-inline list-unstyled">
                                                    <li className="list-inline-item text-secondary">
                                                        <i className="fa fa-user"></i>
                                                        {item.creator}
                                                    </li>
                                                    <li className="list-inline-item text-secondary">
                                                        <i className="fa fa-eye"></i>
                                                        {item.Viewers} Views
                                                    </li>
                                                    <li className="list-inline-item text-secondary">
                                                        <i className="fa fa-calendar"></i>
                                                        {item.created_at}
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <h2>List of News</h2>
                      <p>Find all the news in article</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-9">

                      {listNewsElement}

                      <div className="row mb-2">
                          <div className="col-md-12">
                              <ul className="pagination">
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickPrevious}>Previous</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={() => this.handleClickPage(1)}>1</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={() => this.handleClickPage(2)}>2</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={() => this.handleClickPage(3)}>3</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickNext}>Next</a></li>
                                </ul>
                          </div>
                      </div>

                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    news : state.news
})

const mapDispatchToProps = (dispatch) => ({
    loadArticleList : (page,limit) => (dispatch(loadArticleList(page,limit)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MainNews)
