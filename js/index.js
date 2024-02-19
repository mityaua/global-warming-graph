import { fetchData, parsedData, getLabelAndData } from './api.js';

const ctx = document.querySelector('.js-chart').getContext('2d');

fetchData()
  .then(parsedData)
  .then(getLabelAndData)
  .then(({ years, globalTemps, northTemps, southTemps }) =>
    drawChart(years, globalTemps, northTemps, southTemps),
  )
  .catch(error => console.log(error));

function drawChart(years, data1, data2, data3) {
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: '# Global average temperature',
          data: data1,
          backgroundColor: '#EF476F',
          borderColor: '#EF476F',
          borderWidth: 1,
          fill: false,
        },
        {
          label: '# Northern hemisphere average temperature',
          data: data2,
          backgroundColor: '#118AB2',
          borderColor: '#118AB2',
          borderWidth: 1,
          fill: false,
        },
        {
          label: '# Southern hemisphere average temperature',
          data: data3,
          backgroundColor: '#FFD166',
          borderColor: '#FFD166',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      responsiveAnimationDuration: 500,
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return value + '°';
            },
          },
        },
        x: {
          max: '2023',
        },
      },
    },
  });
}
