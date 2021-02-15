const GLOBAL_MEAN_TEMPERATURE = 14;
const localUrl = './data/ZonAnn.Ts+dSST.csv';
// const webUrl = 'https://cors-anywhere.herokuapp.com/data.giss.nasa.gov/gistemp/tabledata_v4/ZonAnn.Ts+dSST.csv';

export function fetchData() {
  return fetch(localUrl)
    .then(response => response.text())
    .catch(error => error);
}

export function parsedData(data) {
  return Papa.parse(data, { header: true }).data;
}

export function getLabelandData(data) {
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
