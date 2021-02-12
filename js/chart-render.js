const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;
const webUrl =
  'https://data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv';
const localUrl = './data/ZonAnn.Ts+dSST.csv';

fetchData()
  .then(parsedData)
  .then(getLabelandData)
  .then(({ years, globalTemps, northTemps, southTemps }) =>
    drawChart(years, globalTemps, northTemps, southTemps),
  );

function fetchData() {
  return fetch(localUrl).then(response => response.text());
}

function parsedData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelandData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.globalTemps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
      acc.northTemps.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
      acc.southTemps.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);
      return acc;
    },
    { years: [], globalTemps: [], northTemps: [], southTemps: [] },
  );

  // const years = parsedData.map((entry) => entry.Year);
  // const temps = parsedData.map((entry) => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
}

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
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + '°';
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + '';
              },
            },
          },
        ],
      },
    },
  });
}
