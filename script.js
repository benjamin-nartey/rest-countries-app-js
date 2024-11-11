'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//old way

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

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();

//   //1st AJAX call to get the country
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     //   const data = JSON.parse(this.responseText)[0];

//     console.log(data);

//     //Rendering country data
//     renderCountry(data);

//     //Get the neighbour country

//     const neighbour = data.borders[0];

//     console.log(neighbour);

//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();

//     //2nd AJAX call to get the neighbour
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('germany');

// //too many nested callback fxn => callback hell

// getCountryAndNeighbour('austria');

// const request = new XMLHttpRequest();

// request.open('GET', `https://restcountries.com/v3.1/name/portugal`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);

//   //   const data = JSON.parse(this.responseText)[0];

//   console.log(data);
// });

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);

// console.log(request);

//A promise is an object that is used as a placeholder for the future
// result of an asynchronous operation

//Promise Lifecycle

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('portugal');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);

  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      const result = data[0];

      renderCountry(result);

      console.log(result);

      const neighbour = result.borders?.[0];

      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour for this country');

      return neighbour;
    })
    .then(neighbour =>
      fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    )
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(error => renderError(error));
};

// getCountryAndNeighbour('australia');

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

//Async await

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

getCountry('portugal');
// const getCountry = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     if (res.ok) {
//       return res.json();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const get3countries = async function (c1, c2, c3) {
//   // const res1 = await getCountry(c1);
//   // const res2 = await getCountry(c2);
//   // const res3 = await getCountry(c3);
//   // console.log([res1[0], res2[0], res3[0]]);

//   const data = await Promise.allSettled([
//     getCountry(c1),
//     getCountry(c2),
//     getCountry(c3),
//   ]);

//   console.log(data);
// };

// get3countries('ghana', 'germany', 'xcx');

// const loggerFxn = async function () {
//   const cData = await getCountry('portugal');

//   console.log(cData);
// };

// loggerFxn();

//Promise.all
//Promise.race
//Promise.allSettled
//Promise.any
