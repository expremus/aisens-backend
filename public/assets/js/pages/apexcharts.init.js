var newTempData1 = JSON.parse($("#newTempData1").text());
$("#newTempData1").remove();
var newTempData2 = JSON.parse($("#newTempData2").text());
$("#newTempData2").remove();
var newTempData3 = JSON.parse($("#newTempData3").text());
$("#newTempData3").remove();
var dateFirst = JSON.parse($("#dateFirst").text());
$("#dateFirst").remove();
var dateLast = JSON.parse($("#dateLast").text());
$("#dateLast").remove();
var options = {
  chart: {
    height: 380,
    type: "line",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["rgb(226,12,24)", "rgb(80,165,241)", "rgb(52,195,143)"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 3],
    curve: "straight",
  },
  series: [
    {
      name: "Faz1",
      data: newTempData1,
    },
    {
      name: "Faz2",
      data: newTempData2,
    },
    {
      name: "Faz3",
      data: newTempData3,
    },
  ],
  title: {
    text: "Amper",
    align: "left",
    style: {
      fontWeight: "500",
    },
  },
  grid: {
    row: {
      colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.2,
    },
    borderColor: "#f1f1f1",
  },
  markers: {
    style: "inverted",
    size: 0,
  },
  xaxis: {
    // type: "datetime",

    // labels: {
    //   min: new Date(dateFirst),
    // },

    type: "",
    min: dateFirst,
    max: dateLast,

    labels: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: "Amper",
    },
    min: 0,
    max: 30,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
      },
    },
  ],
};

var chart = new ApexCharts(
  document.querySelector("#line_chart_datalabel"),
  options
);
chart.render();
