var samples = 20;
var speed = 300;
let timeout = samples * speed;
var values = [];
var values1 = [];
var values2 = [];
var labels = [];
var charts = [];
var value = 0;
var value1 = 0;
var value2 = 0;
var scale = 1;

addEmptyValues(values, samples);
addEmptyValues(values1, samples);
addEmptyValues(values2, samples);

var originalCalculateXLabelRotation =
  Chart.Scale.prototype.calculateXLabelRotation;

function initialize() {
  charts.push(
    new Chart(document.getElementById("chart0"), {
      type: "line",
      data: {
        //labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgb(226,12,24)",
            borderWidth: 3,
            lineTension: 0.25,
            pointRadius: 0,
          },
          {
            data: values1,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgb(80,165,241)",
            borderWidth: 3,
            lineTension: 0.25,
            pointRadius: 0,
          },
          {
            data: values2,
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgb(52,195,143)",
            borderWidth: 3,
            lineTension: 0.25,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          tension: {
            duration: speed,
            easing: "speed",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        legend: false,
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              gridLines: {
                display: false,
              },
              time: {
                unit: "minute",
                displayFormats: {
                  minute: "mm:ss",
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                max: 30,
                min: 0,
              },
            },
          ],
        },
      },
    })
  );
}

function addEmptyValues(arr, n) {
  for (var i = 0; i < n; i++) {
    arr.push({
      x: moment()
        .subtract((n - i) * 1000, "seconds")
        .toDate(),
      y: null,
    });
  }
}

function rescale() {
  var padding = [];

  addEmptyValues(padding, 10);
  values.splice.apply(values, padding);
  values.splice.apply(values1, padding);
  values.splice.apply(values2, padding);

  scale++;
}

function updateCharts() {
  charts.forEach(function (chart) {
    chart.update();
  });
}

function progress() {
  var id = JSON.parse($("#cihazId").text());

  $.get("http://www.ai-sens.com/getAmpData1/:" + id, function (response) {
    value = response;
  });
  values.push({
    x: new Date(),
    y: value,
  });
  values.shift();
  $.get("http://www.ai-sens.com/getAmpData2/:" + id, function (response1) {
    value1 = response1;
  });
  values1.push({
    x: new Date(),
    y: value1,
  });
  values1.shift();
  $.get("http://www.ai-sens.com/getAmpData3/:" + id, function (response2) {
    value2 = response2;
  });
  values2.push({
    x: new Date(),
    y: value2,
  });
  values2.shift();
}

function advance() {
  if (
    values[0] !== null &&
    values1[0] !== null &&
    values2[0] !== null &&
    scale < 4
  ) {
    //rescale();
    updateCharts();
  }

  progress();
  updateCharts();

  setTimeout(function () {
    requestAnimationFrame(advance);
  }, 1000);
}

window.onload = function () {
  initialize();
  advance();
};
