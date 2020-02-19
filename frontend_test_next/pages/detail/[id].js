import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadDetailArticle} from '../../redux/actions';
import {useRouter} from 'next/router';
import parse from 'html-react-parser';

const detailArticle = (props) => {
    const router = useRouter();
    let paramsId = router.query.id;

    // RELEVANT TO COMPONENT DID MOUNT IN CLASS COMPONENT
    useEffect(() => {
        props.loadDetailArticle(paramsId);
    })

    let thisNewsDetail = props.detailArticle;
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-9">
              <div class="row mb-2">
                  <div class="col-md-12">
                      <div class="card">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-md-12">
                                      <div class="news-title">
                                          <h2>{thisNewsDetail.judul_artikel}</h2>
                                      </div>
                                      <div class="news-cats">
                                          <ul class="list-unstyled list-inline mb-1">
                                               <li class="list-inline-item">
                                                      <i class="fa fa-folder-o text-danger"></i>
                                                      <a href="#"><small>{thisNewsDetail.creator}</small> </a>
                                              </li>
                                               <li class="list-inline-item">
                                                      <i class="fa fa-folder-o text-danger"></i>
                                                      <a href="#"><small>{thisNewsDetail.created_at}</small></a>
                                              </li>
                                          </ul>
                                      </div>

                                      <div class="news-image">
                                          <img src={thisNewsDetail.image} />
                                      </div>
                                      <div class="news-content">
                                          <br />
                                          {parse(`${thisNewsDetail.isi_artikel}`)}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
          <div class="col-md-3">
              <div class="row mb-2">
                <div class="col-md-12">
                    <div class="card">
                       <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                              <div class="card-body">
                                  <h5>Recommendations</h5>
                              </div>
                             </div>
                        </div>
                       </div>
                       <div class="list-group">
                            {/* thisNewsRecommendations */}
                       </div>
                     </div>
                </div>
               </div>
              <div class="row">
                <div class="col-md-12">
                    <div class="card">
                      <div class="card-body">
                          <img src={thisNewsDetail.creator_foto} style={{width:'100%'}} />
                      </div>
                    </div>
                </div>
               </div>
             </div>

          </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    detailArticle : state.article
})

const mapDispatchToProps = (dispatch) => ({
    loadDetailArticle : (idArticle) => (dispatch(loadDetailArticle(idArticle)))
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (detailArticle);
