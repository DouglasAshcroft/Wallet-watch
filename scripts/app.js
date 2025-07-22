let allCoins = [];  
let selectedCoins = [];  
let topFiveCoins = [];
// Fetch the data and display it
async function getAPIData() {
  try {
    const response = await fetch('https://api.coinlore.net/api/tickers/');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const returnedJson = await response.json();
    const coinList = returnedJson.data;  

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
      coinData.volume24a
    ));

    const topFiveCoins = coinList
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 5);  
    console.log(coinObjects);
    displayCoins(topFiveCoins); 
  } catch (error) {
    console.error("Error", error);
  }
}

class Coin {
  constructor(cSupply, id, mCap, mSupply, displayName, nameid, hrChange, weekChange, dayChange, priceBTC, priceUSD, rank, symbol, tSupply, dayTradeVolumeUSD, dayTradeVolumeCoin) {
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
    this.volume24a = dayTradeVolumeCoin;
  }
}

//https://dev.to/dpaluy/embed-js-widgets-smoothly-with-rails-a-step-by-step-guide-fpk
(function tickerFrame() {
  const iframe = document.createElement('iframe');
  iframe.width = "100%";
  iframe.height = '350';
  const divTicker = document.querySelector('.iframe-container');
  divTicker.appendChild(iframe);  
  
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const scriptTag = iframeDoc.createElement('script');
  scriptTag.src = "https://widgets.coingecko.com/gecko-coin-compare-chart-widget.js"; 
  scriptTag.async = true; 
  iframeDoc.head.appendChild(scriptTag)
  scriptTag.onload = () => {
    const widget = iframeDoc.createElement('gecko-coin-compare-chart-widget');
    widget.setAttribute('locale', 'en');
    widget.setAttribute('dark-mode', 'true');
    widget.setAttribute('outlined', 'true');
    widget.setAttribute('coin-ids', 'bitcoin,solana,ripple,dogecoin,ethereum');
    widget.setAttribute('initial-currency', 'usd');
  
    iframeDoc.body.appendChild(widget);
  };
})();
  // getCoin() {
  //   return `${this.name} ${this.symbol} ${this.rank} ${this.price_usd} ${this.percent_change_24h} ${this.volume24}`;
  // }


function displayCoins(coins) {
  const coinListContainer = document.querySelector('.coin-list');
  coinListContainer.innerHTML = ''; 
  coins.forEach(coin => {
    const coinCard = document.createElement('div');
    coinCard.classList.add('coin-card');
    coinCard.innerHTML = `
      <h3>${coin.name} (${coin.symbol})</h3>
      <p>Price: $${coin.price_usd}</p>
      <p>24h Change: ${coin.percent_change_24h}%</p>
      <button onclick="removeCoin(${coin.id})">Remove from Watchlist</button>
    `;
    coinListContainer.appendChild(coinCard);
  });
}

function removeCoin(coinId) {
  const coin = coinId;
  if (displayCoins.includes(coin)) {
    selectedCoins.pop(coin);
    displayCoins();
  }
}

function addCoinToSelection(coinId) {
  const coin = allCoins.find(c => c.id === coinId);
  if (!selectedCoins.includes(coin)) {
    selectedCoins.push(coin);
    displayCoins();
  }
}


function displaySelectedCoins() {
  const carousel = document.querySelector('.carousel');
  carousel.innerHTML = ''; 

  selectedCoins.forEach(coin => {
    const coinCard = document.createElement('div');
    coinCard.classList.add('coin-card');
    coinCard.innerHTML = `
      <h1>${coin.name} (${coin.symbol})</h1>
      <h2>Price (USD): $${coin.price_usd}</h2>
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
  displayCoins(filteredCoins); 
});

function navHomPage(){

};

function connectWallet(){

};

function navHomPage(){

};

function navNFTs(){

};

function navLogin(){

};

getAPIData();

