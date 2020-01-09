const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

const pg = require('pg');
const pool = new pg.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'WIT',
    password: 'admin1234',
    port:'5432'
})
const start_date = '2020-01-06';
const end_date = '2020-01-11';

describe('movies', function () {

    it('POST TESTING : menampilkan error jika nama pencari tidak ada', function (done) {
        chai.request(server)
        .post('/api/movies')
        .send({alamat_email:'steve.harnadi@gmail.com',nomor_handphone:'081222324170',judul_film:'Deathly Hallows'})
        .end(function (err,res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('field should not be null');
            done();
        })
    })

    it('POST TESTING : menampilkan error jika alamat email tidak ada', function (done) {
        chai.request(server)
        .post('/api/movies')
        .send({nama:'Steve',nomor_handphone:'081222324170',judul_film:'Deathly Hallows'})
        .end(function (err,res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('field should not be null');
            done();
        })
    })

    it('POST TESTING : menampilkan error jika nomor hp tidak ada', function (done) {
        chai.request(server)
        .post('/api/movies')
        .send({nama:'Steve',alamat_email:'steve.harnadi@gmail.com',judul_film:'Deathly Hallows'})
        .end(function (err,res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('field should not be null');
            done();
        })
    })

    it('POST TESTING : menampilkan error jika judul pencarian tidak ada', function (done) {
        chai.request(server)
        .post('/api/movies')
        .send({nama:'Steve',alamat_email:'steve.harnadi@gmail.com',nomor_handphone:'081222324170'})
        .end(function (err,res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('field should not be null');
            done();
        })
    })

    it('POST TESTING : menampilkan list movie yang dicari jika parameter lengkap', function (done) {
        chai.request(server)
        .post('/api/movies')
        .send({nama:'Steve',alamat_email:'steve.harnadi@gmail.com',nomor_handphone:'081222324170',judul_film:'Deathly Hallows'})
        .end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('nama_pencari');
            res.body[0].should.have.property('email_pencari');
            res.body[0].should.have.property('handphone_pencari');
            res.body[0].should.have.property('tanggal_pencarian');
            res.body[0].should.have.property('judul_film');
            res.body[0].should.have.property('poster');
            res.body[0].should.have.property('tanggal_rilis');
            res.body[0].should.have.property('durasi');
            res.body[0].should.have.property('genre');
            res.body[0].should.have.property('aktor');
            res.body[0].should.have.property('IMDB_rating');
            res.body[0].should.have.property('rumah_produksi');
            res.body[0].nama_pencari.should.equal('Steve');
            res.body[0].email_pencari.should.equal('steve.harnadi@gmail.com');
            res.body[0].handphone_pencari.should.equal('081222324170');
            res.body[0].judul_film.should.equal('Harry Potter and the Deathly Hallows: Part 2');
            res.body[0].poster.should.equal('https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg');
            res.body[0].tanggal_rilis.should.equal('15 Jul 2011');
            res.body[0].durasi.should.equal('130 min');
            res.body[0].genre.should.equal('Adventure, Drama, Fantasy, Mystery');
            res.body[0].aktor.should.equal('Ralph Fiennes, Michael Gambon, Alan Rickman, Daniel Radcliffe');
            res.body[0].IMDB_rating.should.equal('8.1');
            res.body[0].rumah_produksi.should.equal('Warner Bros. Pictures');
            done();
        })
    })

    it('GET TESTING : menampilkan error jika tidak ada query parameter yang dicantumkan', function (done) {
        chai.request(server)
        .get('/api/movies')
        .end(function (err,res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('You should put minimum one query parameter');
            done();
        })
    })

    it('GET TESTING : menampilkan hasil pencarian berdasarkan query nama pencari', function (done) {
        chai.request(server)
        .get('/api/movies?nama_pencari=Steve')
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('nama_pencari');
            res.body[0].should.have.property('email_pencari');
            res.body[0].should.have.property('handphone_pencari');
            res.body[0].should.have.property('tanggal_pencarian');
            res.body[0].should.have.property('judul_film');
            res.body[0].should.have.property('poster');
            res.body[0].should.have.property('tanggal_rilis');
            res.body[0].should.have.property('durasi');
            res.body[0].should.have.property('genre');
            res.body[0].should.have.property('aktor');
            res.body[0].should.have.property('IMDB_rating');
            res.body[0].should.have.property('rumah_produksi');
            res.body[0].nama_pencari.should.contains('Steve');
            done();
        })
    })

    it('GET TESTING : menampilkan hasil pencarian berdasarkan query judul film', function (done) {
        chai.request(server)
        .get('/api/movies?judul_film=Deathly Hallows')
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('nama_pencari');
            res.body[0].should.have.property('email_pencari');
            res.body[0].should.have.property('handphone_pencari');
            res.body[0].should.have.property('tanggal_pencarian');
            res.body[0].should.have.property('judul_film');
            res.body[0].should.have.property('poster');
            res.body[0].should.have.property('tanggal_rilis');
            res.body[0].should.have.property('durasi');
            res.body[0].should.have.property('genre');
            res.body[0].should.have.property('aktor');
            res.body[0].should.have.property('IMDB_rating');
            res.body[0].should.have.property('rumah_produksi');
            res.body[0].judul_film.should.contains('Deathly Hallows');
            done();
        })
    })

    it('GET TESTING : menampilkan hasil pencarian berdasarkan query rentang tanggal', function (done) {
        chai.request(server)
        .get(`/api/movies?date_from=${start_date}&date_to=${end_date}`)
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('nama_pencari');
            res.body[0].should.have.property('email_pencari');
            res.body[0].should.have.property('handphone_pencari');
            res.body[0].should.have.property('tanggal_pencarian');
            res.body[0].should.have.property('judul_film');
            res.body[0].should.have.property('poster');
            res.body[0].should.have.property('tanggal_rilis');
            res.body[0].should.have.property('durasi');
            res.body[0].should.have.property('genre');
            res.body[0].should.have.property('aktor');
            res.body[0].should.have.property('IMDB_rating');
            res.body[0].should.have.property('rumah_produksi');
            done();
        })
    })

    it('GET TESTING : menampilkan hasil pencarian berdasarkan semua query param yang tersedia', function (done) {
        chai.request(server)
        .get(`/api/movies?nama_pencari=Steve&judul_film=Deathly Hallows&date_from=${start_date}&date_to=${end_date}`)
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('nama_pencari');
            res.body[0].should.have.property('email_pencari');
            res.body[0].should.have.property('handphone_pencari');
            res.body[0].should.have.property('tanggal_pencarian');
            res.body[0].should.have.property('judul_film');
            res.body[0].should.have.property('poster');
            res.body[0].should.have.property('tanggal_rilis');
            res.body[0].should.have.property('durasi');
            res.body[0].should.have.property('genre');
            res.body[0].should.have.property('aktor');
            res.body[0].should.have.property('IMDB_rating');
            res.body[0].should.have.property('rumah_produksi');
            res.body[0].nama_pencari.should.contains('Steve');
            res.body[0].judul_film.should.contains('Deathly Hallows');
            done();
        })
    })

})
