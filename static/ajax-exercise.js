'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((serverData) => {
      document.querySelector('#fortune-text').innerText = serverData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(url + '?zipcode=' + zipcode)
    .then((response) => response.json())
    .then((responseJson) => {
      document.querySelector('#weather-form').innerText = responseJson.forecast;
    });

}


document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
        document.querySelector('#order-status').innerText = responseData.msg;
      }
      else {
        document.querySelector('#order-status').innerText = responseData.msg;
      }
    // console.log(responseData)
    });
    
    
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);
