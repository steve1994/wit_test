<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col-md-9">
          <div class="row mb-2">
              <div class="col-md-12">
                  <div class="card">
                      <div class="card-body">
                          <div class="row">
                              <div class="col-md-12">
                                  <div class="news-title">
                                      <h2>{{newsDetail.judul_artikel}}</h2>
                                  </div>
                                  <div class="news-cats">
                                      <ul class="list-unstyled list-inline mb-1">
                                           <li class="list-inline-item">
                                                  <i class="fa fa-folder-o text-danger"></i>
                                                  <a href="#"><small>{{newsDetail.creator}}</small> </a>
                                          </li>
                                           <li class="list-inline-item">
                                                  <i class="fa fa-folder-o text-danger"></i>
                                                  <a href="#"><small>{{displayFormattedDate(newsDetail.created_at)}}</small></a>
                                          </li>
                                      </ul>
                                  </div>

                                  <div class="news-image">
                                      <img :src="`${newsDetail.image}`" />
                                  </div>
                                  <div class="news-content">
                                      <br />
                                      <div v-html="`${newsDetail.isi_artikel}`">
                                      </div>
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
                        <!-- List Recommendations -->
                   </div>
                 </div>
            </div>
           </div>
          <div class="row">
            <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                      <img :src="`${newsDetail.creator_foto}`" :style="{width:'100%'}" />
                  </div>
                </div>
            </div>
           </div>
         </div>

      </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'NewsDetail',
        data: () => {
            return {
                newsDetail : {}
            };
        },
        mounted: function() {
            let urlFetchData = `http://13.250.52.196/artikel?layout_type=detail_layout&media_type=artikel_media&artikel_id=${this.$route.params.id}&user_id=3&page=1&limit=6`;
            fetch(urlFetchData)
            .then(response => response.json())
            .then(response => {
                this.newsDetail = response.data;
            })
            .catch(error => {console.log(error)})
        },
        methods: {
            displayFormattedDate : function (date) {
                return moment(date).format("D-MMMM-YYYY hh:mm:ss");
            }
        }
    }
</script>
