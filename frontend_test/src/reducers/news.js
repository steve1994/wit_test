const news = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_NEWS_SUCCESS':
            return action.newsListData;
        case 'LOAD_NEWS_FAILURE':
        default:
            return state;
    }
}

export default news;
