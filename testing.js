// //module.exports = function app() {
let defaultDisplay = []
let userSelected = []
//Fetch the first 100 coins
async function getAPIData() {
  try{
    const response = await fetch('https://api.coinlore.net/api/tickers/');
    if (!response.ok){
        throw new Error (`code: ${response.status}, status text: ${response.statusText}`);
    }
    const returnedJson = await response.json()
    const coinList = returnedJson.data
      console.log("Coin List" , coinList);
    
    const coinObjects = coinList.map(coinData => new Coin(
      coinData.csupply,
      coinData.id,
      coinData.market_cap_usd,
      coinData.msupply,
      coinData.name,
      coinData.nameid,
      coinData.percent_change_1h,
      coinData.percent_change_7d,
      coinData.percent_change_24h,
      coinData.price_btc,
      coinData.price_usd,
      coinData.rank,
      coinData.symbol,
      coinData.tsupply,
      coinData.volume24,
      coinData.volume24a,
    ));
    console.log(coinObjects);
    const topFive = coinObjects.coinData.rank(1,2,3,4,5)
    displayCoins(topFive);
  } catch (error){
    console.error("Error",error);
  }
}

class Coin { 
  constructor(cSupply, id, mCap, mSupply, displayName, nameid, hrChange, weekChange, dayChange, priceBTC, priceUSD, rank, symbol, tSupply, dayTradeVolumeUSD, dayTradeVolumeCoin){
    this.csupply = cSupply;
    this.id = id;
    this.market_cap_usd = mCap;
    this.msupply = mSupply;
    this.name = displayName;
    this.nameid = nameid;
    this.percent_change_1h = hrChange;
    this.percent_change_7d = weekChange;
    this.percent_change_24h = dayChange;
    this.price_btc = priceBTC;
    this.price_usd = priceUSD;
    this.rank = rank;
    this.symbol = symbol;
    this.tsupply = tSupply;
    this.volume24 = dayTradeVolumeUSD;
    this.volume24a = dayTradeVolumeCoin
    }
  }

  function getCoin(){
    const coinCard = `${this.displayName} ${this.symbol} ${this.rank} ${this.priceUSD} ${this.percent_change_24h} ${this.volume24}`;
    return coinCard
  }
//use getCoin to print the coin stats to coinDisplay
function displayCoinList(coins) {
  const coinListContainer = document.querySelector('.coin-list');
  coinListContainer.innerHTML = '';

  coins.forEach(coin => {
    const coinCard = document.createElement('div');
    coinCard.classList.add('coin-card');
    coinCard.innerHTML = `
      <h2>${coin.name} (${coin.symbol})</h2>
      <h3>${coin.price_usd}<h3>
      <button onclick="addCoinToSelection(${coin.id})">Add to Selection</button>
    `;
    coinListContainer.appendChild(coinCard);
  });
}

function addCoinToSelection(coinId) {
  const coin = Coin.find(c => c.id === coinId);
  if (!selectedCoins.includes(coin)) {
    selectedCoins.push(coin);
    displaySelectedCoins();
  }
}

function displaySelectedCoins() {
  const carousel = document.querySelector('.carousel');
  carousel.innerHTML = ''; // Clear previous selected coins

  selectedCoins.forEach(coin => {
    const coinCard = document.createElement('div');
    coinCard.classList.add('coin-card');
    coinCard.innerHTML = `
      <h3>${coin.name} (${coin.symbol})</h3>
      <p>Price (USD): $${coin.price_usd}</p>
      <p>24h Change: ${coin.percent_change_24h}%</p>
    `;
    carousel.appendChild(coinCard);
  });
}
document.getElementById('search-bar').addEventListener('input', function(event) {
  const searchQuery = event.target.value.toLowerCase();
  const filteredCoins = allCoins.filter(coin => {
    return coin.name.toLowerCase().includes(searchQuery) || coin.symbol.toLowerCase().includes(searchQuery);
  });
  displayCoinList(filteredCoins); // Display the filtered coins
});

const coinDisplay = () =>{
  const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';
}
    
// (this.nameid || this.displayName || this.symbol) 
//     const coinDetails = `${this.displayName} ${this.symbol} ${this.rank} ${this.priceUSD} ${this.percent_change_24h} ${this.volume24}`;
//     return coinDetails;
//     }
//FINISH ABOVE ||||



getAPIData(); 
// function prepareFrame() {
//         var iframe = document.createElement("iframe");
//         iframe.setAttribute("src", rel="images", href="images/Wallet Watch Outline.sgv")
//         iframe.style.width = "640px";
//         iframe.style.height = "480px";
//         document.body.appendChild(iframe);


