const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {


    test('GET like an non-existent symbol(/api/stock-prices/?stock=[mistaken]&like=true)', (done) => {

        chai.request(server)
            .get("/api/stock-prices/?stock=asdf23&like=true")
            .end((err, res) => {

                assert.equal(res.status, 500, "Status should be 500");
                assert.equal(res.body.stockData.error, "invalid symbol");
                done();
            })


    });

    test("GET like an existing symbol (/api/stock-prices/?stock=goog&like=true", (done) => {

        chai.request(server)
            .get('/api/stock-prices/?stock=goog&like=true')
            .end((err, res) => {


                assert.equal(res.status, 200, "Status should be 200");

                assert.hasAllKeys(res.body.stockData, ['price', 'likes', "stock"]);
                assert.equal(res.body.stockData.stock, 'GOOG');

                assert.isNumber(res.body.stockData.price, "price is excepted to be a number");

                assert.isNumber(res.body.stockData.likes, "like is excepted to be a number");




                done();

            });

    });


    test("GET like two symbols one of them non-existing", (done) => {
        chai.request(server)
            .get("/api/stock-prices?stock=gi34ldSDF&stock=TxN&like=false")
            .end((err, res) => {

                assert.equal(res.status, 500, "Status should be 500");
                assert.equal(res.body.stockData.error, "invalid symbol(s)");
                done();
            })
    });

    test("GET like two symbols both of them non-existing", (done) => {
        chai.request(server)
            .get("/api/stock-prices?stock=gi34ldSDF&stock=Txwewe34N&like=false")
            .end((err, res) => {

                assert.equal(res.status, 500, "Status should be 500");
                assert.equal(res.body.stockData.error, "invalid symbol(s)");
                done();
            })
    })

    test("GET like two symbols ", (done) => {
        chai.request(server)
            .get("/api/stock-prices?stock=gild&stock=TxN&like=false")
            .end((err, res) => {


                assert.equal(res.status, 200, "Status should be 200");
                assert.isArray(res.body.stockData, "stockData should be an array");

                for (let i = 0; i < 2; i++) {
                    assert.hasAllKeys(res.body.stockData[i], ["stock", 'price', 'rel_likes']);
                    assert.isNumber(res.body.stockData[i].price, "price is excepted to be a number");
                    assert.isNumber(res.body.stockData[i].rel_likes, "rel_likes is excepted to be a number");

                }

                assert.equal(res.body.stockData[0].stock, 'GILD');
                assert.equal(res.body.stockData[1].stock, 'TXN');

                assert.equal(res.body.stockData[0].rel_likes, -res.body.stockData[1].rel_likes, "rel_likes of each symbol are excepted to be the oposite");

                done();
            })
    })



});


