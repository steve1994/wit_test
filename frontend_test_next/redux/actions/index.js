import axios from 'axios';

// URL TO FETCH API
const API_URL = 'http://13.250.52.196/'
const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
})

// FETCH ARTICLE BASED ON PAGE AND LIMIT
export const loadArticleListSuccess = (listArtikel) => ({
    type : 'LOAD_ARTICLE_SUCCESS',
    listArtikel
})

export const loadArticleListFailure = () => ({
    type : 'LOAD_ARTICLE_FAILURE'
})

export const loadArticleList = (page,limit) => {
    return dispatch => {
        return request.get('/artikel',{
            params : {
                layout_type : 'list_layout',
                media_type : 'artikel_media',
                page : `${page}`,
                limit : `${limit}`
            }
        })
        .then((response) => {
            dispatch(loadArticleListSuccess(response.data.data))
        })
        .catch((error) => {
            dispatch(loadArticleListFailure())
        })
    }
}

// FETCH THE DETAIL OF ARTICLE
export const loadDetailArticleSuccess = (detailArtikel) => ({
    type : 'LOAD_DETAIL_ARTICLE_SUCCESS',
    detailArtikel
})

export const loadDetailArticleFailure = () => ({
    type : 'LOAD_DETAIL_ARTICLE_FAILURE'
})

export const loadDetailArticle = (idArticle) => {
    return dispatch => {
        return request.get('/artikel',{
            params : {
                layout_type : 'detail_layout',
                media_type : 'artikel_media',
                artikel_id : `${idArticle}`,
                user_id : 3,
                page : 1,
                limit : 6
            }
        })
        .then((response) => {
            dispatch(loadDetailArticleSuccess(response.data.data));
        })
        .catch((error) => {
            dispatch(loadDetailArticleFailure());
        })
    }
}
