var express = require('express');
var router = express.Router();
const axios = require('axios');

module.exports = (pool) => {

    /*
        ROUTER FOR POSTING MOVIE SEARCH FROM USER
    */
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

    /*
        ROUTER FOR SEARCH MOVIE POSTING BASED ON PARAMS
    */
    router.get('/', function (req,res) {
        let nama = req.query.nama_pencari;
        let judul = req.query.judul_film;
        let date_from = req.query.date_from;
        let date_to = req.query.date_to;

        // Build string conditional in WHERE clause for SELECT Query
        let stringConditional = '';
        if (nama) {
            stringConditional += `nama_pencari LIKE '%${nama}%'`;
        }
        if (judul) {
            if (stringConditional != "") {
                stringConditional += ' AND ';
            }
            stringConditional += `judul_film LIKE '%${judul}%'`;
        }
        if (date_from && date_to) {
            if (stringConditional != "") {
                stringConditional += ' AND ';
            }
            stringConditional += `((tanggal_pencarian >= '${date_from}') AND (tanggal_pencarian <= '${date_to}'))`;
        }

        // Build Query SQL for SELECT query
        if (stringConditional == "") {
            res.status(400).json({error:'You should put minimum one query parameter'});
        } else {
            let sql = `SELECT * FROM movie WHERE ${stringConditional}`;
            pool.query(sql, function (error,response) {
                if (error) {
                    res.status(400).json({error});
                } else {
                    let jsonObjectResponses = [];
                    for (let i=0;i<response.rows.length;i++) {
                        jsonObjectResponses.push({
                            nama_pencari : response.rows[i].nama_pencari,
                            email_pencari : response.rows[i].alamat_email,
                            handphone_pencari : response.rows[i].nomor_hp,
                            tanggal_pencarian : response.rows[i].tanggal_pencarian,
                            judul_film : response.rows[i].judul_film,
                            poster : response.rows[i].poster,
                            tanggal_rilis : response.rows[i].tanggal_rilis,
                            durasi : response.rows[i].durasi,
                            genre : response.rows[i].genre,
                            aktor : response.rows[i].aktor,
                            IMDB_rating : response.rows[i].imdb_rating,
                            rumah_produksi : response.rows[i].rumah_produksi
                        })
                    }
                    res.status(200).json(jsonObjectResponses);
                }
            })
        }
    })

    return router;
}
