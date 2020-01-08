var express = require('express');
var router = express.Router();
const axios = require('axios');

module.exports = (pool) => {

    router.post('/', function(req, res) {
        let nama = req.body.nama;
        let email = req.body.alamat_email;
        let handphone = req.body.nomor_handphone;
        let judul = req.body.judul_film;
        if (!nama || !email || !handphone || !judul) {
            res.status(400).json({error : 'field should not be null'})
        } else {
            axios.get('https://jsonmock.hackerrank.com/api/movies/search/?Title='+judul)
            .then(function(response) {
                let listMovies = response.data.data;
                let requestMovieDetails = [];
                for (let i=0;i<listMovies.length;i++) {
                    let requestMovieLink = `http://www.omdbapi.com/?i=${listMovies[i].imdbID}&apikey=c4e0ecae`;
                    requestMovieDetails.push(axios.get(requestMovieLink));
                }
                axios.all(requestMovieDetails)
                .then(axios.spread(function (...responses) {
                    let numMovieRequested = responses.length;
                    // build Conditional String for INSERT Query
                    let stringCondition = "";
                    let counter = 1;
                    for (let i=0;i<numMovieRequested;i++) {
                        stringCondition += `($${counter},
                                             $${counter+1},
                                             $${counter+2},
                                             $${counter+3},
                                             $${counter+4},
                                             $${counter+5},
                                             $${counter+6},
                                             $${counter+7},
                                             $${counter+8},
                                             $${counter+9},
                                             $${counter+10},
                                             $${counter+11})`;
                        if (i < numMovieRequested-1) {
                            stringCondition += ",";
                        }
                        counter += 12;
                    }
                    // build Params Value for INSERT Query
                    let params = []
                    let jsonObjectResponses = [];
                    for (let i=0;i<numMovieRequested;i++) {
                        let tanggalPencarian = new Date();
                        params.push(nama);
                        params.push(email);
                        params.push(handphone);
                        params.push(tanggalPencarian);
                        params.push(responses[i].data.Title);
                        params.push(responses[i].data.Poster);
                        params.push(responses[i].data.Released);
                        params.push(responses[i].data.Runtime);
                        params.push(`"${responses[i].data.Genre}"`);
                        params.push(`"${responses[i].data.Actors}"`);
                        params.push(responses[i].data.imdbRating);
                        params.push(responses[i].data.Production);
                        jsonObjectResponses.push({
                            nama_pencari : nama,
                            email_pencari : email,
                            handphone_pencari : handphone,
                            tanggal_pencarian : tanggalPencarian,
                            judul_film : responses[i].data.Title,
                            poster : responses[i].data.Poster,
                            tanggal_rilis : responses[i].data.Released,
                            durasi : responses[i].data.Runtime,
                            genre : responses[i].data.Genre,
                            aktor : responses[i].data.Actors,
                            IMDB_rating : responses[i].data.imdbRating,
                            rumah_produksi : responses[i].data.Production
                        })
                    }
                    // build sql query for INSERT
                    let sql = `INSERT INTO movie(nama_pencari,alamat_email,nomor_hp,tanggal_pencarian,judul_film,poster,tanggal_rilis,durasi,genre,aktor,imdb_rating,rumah_produksi) VALUES ${stringCondition}`;
                    pool.query(sql,params,function (error,response) {
                        if (error) {
                            res.status(400).json({error})
                        } else {
                            res.status(200).json(jsonObjectResponses);
                        }
                    })
                }))
                .catch(function (error) {
                    res.status(400).json({error})
                })
            })
            .catch(function (error) {
                res.status(400).json({error})
            })
        }
    });

    return router;
}
