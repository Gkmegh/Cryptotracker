const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

function fetchCryptocurrencyData() {
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}

function renderGridView(data) {
  const cryptoContainer = document.getElementById('cryptoContainer');
  cryptoContainer.innerHTML = '';

  data.forEach(crypto => {
    const card = document.createElement('div');
    card.className = 'crypto-card';

    const image = document.createElement('img');
    image.src = crypto.image;
    image.alt = crypto.name;
    card.appendChild(image);

    const symbolAndName = document.createElement('div');
    symbolAndName.classList.add('symbol-id');

    const symbol = document.createElement('span');
    symbol.textContent = crypto.symbol.toUpperCase();
    symbolAndName.appendChild(symbol);

    const name = document.createElement('span');
    name.textContent = crypto.name;
    symbolAndName.appendChild(name);

    card.appendChild(symbolAndName);

    // Create and style the market change element
    const priceChange = document.createElement('p');
    const formattedChange = crypto.price_change_percentage_24h.toFixed(2);
    priceChange.textContent = `24h Change: ${formattedChange}%`;
    priceChange.classList.add('market-change');

    // Determine whether the change is positive or negative
    if (crypto.price_change_percentage_24h >= 0) {
      priceChange.classList.add('positive-change');
    } else {
      priceChange.classList.add('negative-change');
    }

    card.appendChild(priceChange);

    // Create and style the price element with a class
    const price = document.createElement('p');
    price.textContent = `Price: $${crypto.current_price}`;
    price.classList.add('crypto-price'); // Add class for styling
    // Add class based on positive/negative value for the price
    if (crypto.price_change_percentage_24h >= 0) {
      price.classList.add('positive-change');
    } else {
      price.classList.add('negative-change');
    }
    card.appendChild(price);

    // Add the total volume above the market cap
    const totalVolume = document.createElement('p');
    totalVolume.textContent = `Total Volume: $${crypto.total_volume}`;
    card.appendChild(totalVolume);

    // Create and add the market cap element
    const marketCap = document.createElement('p');
    marketCap.textContent = `Market Cap: $${crypto.market_cap}`;
    card.appendChild(marketCap);

    cryptoContainer.appendChild(card);
  });
}

function renderListView(data) {
  const listContainer = document.getElementById('cryptoTable');
  listContainer.style.display = 'block'; // Display the list container
  const gridViewContainer = document.getElementById('cryptoContainer');
  gridViewContainer.style.display = 'none'; // Hide the grid view container

  listContainer.innerHTML = ''; // Clear previous content

  data.forEach(crypto => {
    const listItem = createListItem(crypto); // Use the createListItem function to create each list item
    listContainer.appendChild(listItem);
  });
}

function createListItem(data) {
  const listItem = document.createElement('tr');
  listItem.className = 'crypto-list-item';

  const imageCell = document.createElement('td');
  const image = document.createElement('img');
  image.src = data.image;
  image.alt = data.name;
  image.width = 25; // Set the image width to 25 pixels
  imageCell.appendChild(image);

  const nameCell = document.createElement('td');
  nameCell.textContent = data.name;

  const symbolCell = document.createElement('td');
  symbolCell.textContent = data.symbol.toUpperCase();

  const marketChangeCell = document.createElement('td');
  const formattedChange = data.price_change_percentage_24h.toFixed(2);
  marketChangeCell.textContent = `${formattedChange}%`;
  marketChangeCell.classList.add('market-change');

  if (data.price_change_percentage_24h >= 0) {
    marketChangeCell.classList.add('positive');
  } else {
    marketChangeCell.classList.add('negative');
  }

  const priceCell = document.createElement('td');
  priceCell.textContent = `$${data.current_price}`;

  const totalVolumeCell = document.createElement('td');
  totalVolumeCell.textContent = `$${data.total_volume.toLocaleString('en-US')}`;

  const marketCapCell = document.createElement('td');
  marketCapCell.textContent = `$${data.market_cap.toLocaleString('en-US')}`;

  listItem.appendChild(imageCell);
  listItem.appendChild(nameCell);
  listItem.appendChild(symbolCell);
  listItem.appendChild(marketChangeCell);
  listItem.appendChild(priceCell);
  listItem.appendChild(totalVolumeCell);
  listItem.appendChild(marketCapCell);

  return listItem;
}

function changeView(viewType) {
  const gridContainer = document.getElementById('cryptoContainer');
  const tableContainer = document.getElementById('cryptoTable');
  const gridTab = document.querySelector('.tab-btn:nth-child(1)');
  const listTab = document.querySelector('.tab-btn:nth-child(2)');

  if (viewType === 'grid') {
    gridContainer.style.display = 'grid';
    tableContainer.style.display = 'none';
    gridTab.classList.add('active');
    listTab.classList.remove('active');
  } else if (viewType === 'list') {
    gridContainer.style.display = 'none';
    tableContainer.style.display = 'table';
    gridTab.classList.remove('active');
    listTab.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCryptocurrencyData()
    .then(data => {
      renderGridView(data);
      renderListView(data);
    })
    .catch(error => console.error('Error:', error));
});
