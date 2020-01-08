const newsDetail = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_NEWS_DETAIL_SUCCESS':
            return action.newsDetailData;
        case 'LOAD_NEWS_DETAIL_FAILURE':
        default:
            return state;
    }
}

export default newsDetail;
