'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//1. (Old Way), this was the old and outdated way of getting data from an endPoint, we call it making ajax call

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     //   const data = JSON.parse(this.responseText)[0];

//     console.log(data);

//     const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>${(
//               Number(data.population) / 1000000
//             ).toFixed(1)}</span> people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.deu}</p>
//             <p class="country__row"><span>${
//               data.currencies.EUR.name
//             }</span>CUR</p>
//           </div>
//         </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('germany');

//Our render function
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data?.flags?.png}" />
            <div class="country__data">
              <h3 class="country__name">${data?.name?.common}</h3>
              <h4 class="country__region">${data?.region}</h4>
              <p class="country__row"><span>${(
                Number(data.population) / 1000000
              ).toFixed(1)}</span> people</p>
              <p class="country__row"><span>🗣️</span>${data?.languages?.deu}</p>
              <p class="country__row"><span>${
                data.currencies?.EUR?.name
              }</span>CUR</p> 
            </div>
          </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

//2.a getCountry using promise.then

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res)
//     .then(data => renderCountry(data[0]))
//     .catch(error => renderError(error));
// };

//2.b getCountry Using aync wait
const getCountry = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    const [data] = await res.json();
    console.log(data);
    // const result = data[0];

    renderCountry(data);

    return data;
  } catch (error) {
    renderError(error);
  }
};

// getCountry('portugal');

//Custom renderError function
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);

  countriesContainer.style.opacity = 1;
}

//getCountryAndNeighbour using promise.then

// const getCountryAndNeighbour = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       const result = data[0];

//       renderCountry(result);

//       console.log(result);

//       const neighbour = result.borders?.[0];

//       console.log(neighbour);

//       if (!neighbour) throw new Error('No neighbour for this country');

//       return neighbour;
//     })
//     .then(neighbour =>
//       fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     )
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(error => renderError(error));
// };

//getCountryAndNeighbour using Async await

const getCountryAndNeighbour = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    //  const data = await res.json()[0]

    const [data] = await res.json();
    renderCountry(data);

    const neighbour = data?.borders?.[0];
    if (!neighbour) throw new Error('This country has no neighbor');

    const neighbourResponse = await fetch(
      `https://restcountries.com/v3.1/alpha/${neighbour}`
    );
    const [neigbourData] = await neighbourResponse.json();

    renderCountry(neigbourData, 'neighbour');
  } catch (error) {
    renderError(error);
  }
};

getCountryAndNeighbour('germany');

//How to create your own promise object using setTimeout

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery result is loading...');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You have won the lottery💵');
//     } else {
//       reject(new Error('You have lost your money🤭'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
