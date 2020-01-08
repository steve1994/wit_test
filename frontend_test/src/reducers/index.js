import {combineReducers} from 'redux';
import news from './news';
import newsDetail from './newsDetail';

export default combineReducers({
    news,
    newsDetail
})
