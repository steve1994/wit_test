const article = (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_DETAIL_ARTICLE_SUCCESS':
            return action.detailArtikel;
        case 'LOAD_DETAIL_ARTICLE_FAILURE':
        default:
            return state;
    }
}

export default article
