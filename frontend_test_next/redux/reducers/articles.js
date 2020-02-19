const articles = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_ARTICLE_SUCCESS':
            return action.listArtikel;
        case 'LOAD_ARTICLE_FAILURE':
        default:
            return state;
    }
}

export default articles
