import React from 'react'
import {connect} from 'react-redux';
import {loadArticleList} from '../redux/actions';
import parse from 'html-react-parser';
import Link from 'next/link';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page:1,limit:6}
    }

    componentDidMount() {
        this.props.loadArticleList(this.state.page,this.state.limit);
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.page != this.state.page) {
            this.props.loadArticleList(this.state.page,this.state.limit);
        }
    }

    handleClickPrevious(e) {
        e.preventDefault();
        let currentPage = this.state.page;
        if (currentPage-1 >= 1) {
            this.setState({page:currentPage-1});
        }
    }

    handleClickNext(e) {
        e.preventDefault();
        let maxPage = 3;
        let currentPage = this.state.page;
        if (currentPage + 1 <= maxPage) {
            this.setState({page:currentPage+1});
        }
    }

    handleClickPage(numPage) {
        this.setState({page:numPage});
    }

    render() {
        let listArtikel = this.props.listArticles.map((item,index) => {
            return (
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={item.image} style={{width:'100%'}} />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="news-content">
                                                <Link href="/detail/[id]" as={`/detail/${item.id_artikel}`}>
                                                    <a><h2>{item.judul_artikel}</h2></a>
                                                </Link>
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
        })
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

                      {listArtikel}

                      <div className="row mb-2">
                          <div className="col-md-12">
                              <ul className="pagination">
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickPrevious.bind(this)}>Previous</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickPage.bind(this,1)}>1</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickPage.bind(this,2)}>2</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickPage.bind(this,3)}>3</a></li>
                                  <li className="page-item"><a className="page-link" href="#" onClick={this.handleClickNext.bind(this)}>Next</a></li>
                                </ul>
                          </div>
                      </div>

                  </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listArticles : state.articles
})

const mapDispatchToProps = (dispatch) => ({
    loadArticleList : (page,limit) => (dispatch(loadArticleList(page,limit)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Home)
