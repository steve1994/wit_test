<template>
    <div class="container" id="app">
        <div class="row">
            <div class="col-md-12">
                <h2>List of News</h2>
                <p>Find all the news in article</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">

                <div v-for="news in listNews" :key="news.id_artikel">
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4" :style="{backgroundImage:`url(${news.image})`, backgroundSize:'cover'}">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <div class="news-content" :style="{textAlign:'left'}">
                                                    <h2><router-link :to="`/detail/${news.id_artikel}`">{{news.judul_artikel}}</router-link></h2>
                                                    <div v-html="`${news.summary}`">
                                                    </div>
                                                </div>
                                                <div class="news-footer">
                                                <div class="news-author" :style="{textAlign:'left'}">
                                                    <ul class="list-inline list-unstyled">
                                                        <li class="list-inline-item text-secondary">
                                                            <i class="fa fa-user"></i>
                                                            {{news.creator}}
                                                        </li>
                                                        <li class="list-inline-item text-secondary">
                                                            <i class="fa fa-eye"></i>
                                                            {{news.Viewers}} Views
                                                        </li>
                                                        <li class="list-inline-item text-secondary">
                                                            <i class="fa fa-calendar"></i>
                                                            {{displayFormattedDate(news.created_at)}}
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
                </div>


                <div class="row mb-2">
                    <div class="col-md-12">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" v-on:click="handlePreviousPage">Previous</a></li>
                            <li class="page-item" :class="{active:(page == 1)}"><a class="page-link" v-on:click="handleThisPage(1)">1</a></li>
                            <li class="page-item" :class="{active:(page == 2)}"><a class="page-link" v-on:click="handleThisPage(2)">2</a></li>
                            <li class="page-item" :class="{active:(page == 3)}"><a class="page-link" v-on:click="handleThisPage(3)">3</a></li>
                            <li class="page-item"><a class="page-link" v-on:click="handleNextPage">Next</a></li>
                          </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'News',
        data: () => {
            return {
                listNews : [],
                page : 1,
                limit : 6
            };
        },
        mounted: function() {
            this.reloadContentData();
        },
        watch : {
            page : function() {
                this.reloadContentData();
            }
        },
        methods: {
            displayFormattedDate : function (date) {
                return moment(date).format("D-MMMM-YYYY hh:mm:ss");
            },
            reloadContentData : function() {
                let urlFetchData = `http://13.250.52.196/artikel?layout_type=list_layout&media_type=artikel_media&page=${this.page}&limit=${this.limit}`;
                fetch(urlFetchData)
                .then(response => response.json())
                .then(response => {
                    this.listNews = response.data;
                })
                .catch(error => {console.log(error)})
            },
            handlePreviousPage : function () {
                if (this.page > 1) {
                    this.page -= 1;
                }
            },
            handleNextPage : function () {
                if (this.page < 3) {
                    this.page += 1;
                }
            },
            handleThisPage : function (numPage) {
                this.page = numPage;
            }
        }
    }
</script>
