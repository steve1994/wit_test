import axios from 'axios';

const API_URL = 'http://13.250.52.196/'
const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
})

export const loadArticleListSuccess = (newsListData) => ({
    type: 'LOAD_NEWS_SUCCESS',
    newsListData
})

export const loadArticleListFailure = () => ({
    type: 'LOAD_NEWS_FAILURE'
})

export const loadArticleList = (page, limit) => {
    return dispatch => {
        return request.get('/artikel', {
            params: {
                layout_type : 'list_layout',
                media_type : 'artikel_media',
                page : `${page}`,
                limit : `${limit}`
            }
        })
        .then(function (response) {
            console.log(response.data.data);
            dispatch(loadArticleListSuccess(response.data.data));
        })
        .catch(function (error) {
            console.error(error);
            dispatch(loadArticleListFailure());
        })
    }
}

export const loadDetailArticleSuccess = (newsDetailData) => ({
    type: 'LOAD_NEWS_DETAIL_SUCCESS',
    newsDetailData
})

export const loadDetailArticleFailure = () => ({
    type: 'LOAD_NEWS_DETAIL_FAILURE'
})

export const loadDetailArticle = (idArticle) => {
    return dispatch => {
        return request.get('/artikel', {
            params: {
                layout_type : 'detail_layout',
                media_type : 'artikel_media',
                artikel_id : `${idArticle}`,
                user_id : 3,
                page : 1,
                limit : 6
            }
        })
        .then(function (response) {
            dispatch(loadDetailArticleSuccess(response.data.data));
        })
        .catch(function (error) {
            console.error(error);
            dispatch(loadDetailArticleFailure());
        })
    }
}
