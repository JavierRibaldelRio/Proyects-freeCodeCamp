'use strict';
const crypto = require('crypto');
const Stock = require("../models/Stock.js")





module.exports = (app) => {


  app.set('trust proxy', true); // Enable trust proxy

  app.route('/api/stock-prices')
    .get(async (req, res) => {

      // Stock
      const stockName = req.query.stock;
      const hashedIP = generateHash(req.ip);

      // Show and like just one
      if (typeof stockName === "string") {

        // Gets the data
        const { symbol, latestPrice } = await fetchStockData(stockName);

        if (!symbol) {

          res.status(500).json({ stockData: { error: "invalid symbol", likes: 0 } });

        }
        else {
          // Like
          const like = req.query.like === "true";


          const symbolDataFromDB = await likeSymbolFromDatabase(symbol, like, hashedIP);

          const numberOfLikes = symbolDataFromDB.likes;

          res.status(200).json({ stockData: { stock: symbol, price: latestPrice, likes: numberOfLikes } });

        }
      }

      else {

        // Gets all the data of the two actions

        const dataAction = await Promise.all(stockName.map(fetchStockData));
        if (dataAction.some(x => x === 'Invalid symbol')) {
          res.status(500).json({ stockData: { error: "invalid symbol(s)" } });
        }
        else {
          // Like
          const like = req.query.like === "true";

          const likeSymbolLauncher = async (x) => (await likeSymbolFromDatabase(x.symbol, like, hashedIP)).likes;

          const likesDataFromDB = await Promise.all(dataAction.map(likeSymbolLauncher));


          const diference = likesDataFromDB[0] - likesDataFromDB[1];

          const answer = [
            { stock: dataAction[0].symbol, price: dataAction[0].latestPrice, rel_likes: diference },
            { stock: dataAction[1].symbol, price: dataAction[1].latestPrice, rel_likes: -diference }];

          res.status(200).json({ stockData: answer });
        }

      }


    });

};

// Gets and stock and returns it's data asociated
const fetchStockData = async (stock) => {

  const stockData = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);

  const data = await stockData.json();
  return data;
}


const generateHash = (ip) => crypto.createHash("sha256").update(ip).digest('hex');

// Likes a symbol in the database and then return the data asociated to
const likeSymbolFromDatabase = async (symbol, isLike, hashedIP) => {


  // Tries to find the symbol
  let stockResult = await Stock.findOne({ symbol });

  // If there is already this symbol in the database and the user hasn't vote yet
  if (stockResult && !stockResult.ip.includes(hashedIP)) {

    // Likes the symbol
    if (isLike) {
      stockResult.likes += 1;

    }

    // Adds the new ip adress and votes
    stockResult.ip.push(hashedIP);

    await stockResult.save();


  }

  // Cretes the symbol if not exists
  else if (!stockResult) {



    stockResult = new Stock({
      symbol: symbol,
      likes: isLike ? 1 : 0,
      ip: [hashedIP]
    });
    await stockResult.save();
  }


  return stockResult;
}