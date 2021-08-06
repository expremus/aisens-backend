/*
Template Name: Skote - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Echarts Init Js File
*/
// gauge chart

var dom = document.getElementById("gauge-chart1");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  toolbox: {
    feature: {
      restore: { title: "Yenile" },
      saveAsImage: { title: "Resim indir" },
    },
  },
  series: [
    {
      name: "Business indicator",
      min: 0,
      max: 30,
      type: "gauge",
      detail: { formatter: "{value}" },
      axisLine: {
        lineStyle: {
          color: [
            [0.2, "#E20C18"],
            [0.8, "#50A5F1"],
            [1, "#34C38F"],
          ],
          width: 10,
        },
      },
      data: [{ value: 30, name: "" }],
    },
  ],
};

setInterval(function () {
  var id = JSON.parse($("#cihazId").text());

  $.get("http://www.ai-sens.com/getAmpData1/:" + id, function (response) {
    option.series[0].data[0].value = response;
    myChart.setOption(option, true);
  });
}, 2000);
if (option && typeof option === "object") {
  myChart.setOption(option, true);
}

var dom = document.getElementById("gauge-chart2");
var myChart1 = echarts.init(dom);
var app = {};
option = null;
option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  toolbox: {
    feature: {
      restore: { title: "Yenile" },
      saveAsImage: { title: "Resim indir" },
    },
  },
  series: [
    {
      name: "Business indicator",
      min: 0,
      max: 30,
      type: "gauge",
      detail: { formatter: "{value}" },
      axisLine: {
        lineStyle: {
          color: [
            [0.2, "#E20C18"],
            [0.8, "#50A5F1"],
            [1, "#34C38F"],
          ],
          width: 10,
        },
      },
      data: [{ value: 30, name: "" }],
    },
  ],
};

setInterval(function () {
  var id = JSON.parse($("#cihazId").text());

  $.get("http://www.ai-sens.com/getAmpData2/:" + id, function (response1) {
    option.series[0].data[0].value = response1;
    myChart1.setOption(option, true);
  });
}, 2000);
if (option && typeof option === "object") {
  myChart1.setOption(option, true);
}

var dom = document.getElementById("gauge-chart3");
var myChart2 = echarts.init(dom);
var app = {};
option = null;
option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  toolbox: {
    feature: {
      restore: { title: "Yenile" },
      saveAsImage: { title: "Resim indir" },
    },
  },
  series: [
    {
      name: "Business indicator",
      min: 0,
      max: 30,
      type: "gauge",
      detail: { formatter: "{value}" },
      axisLine: {
        lineStyle: {
          color: [
            [0.2, "#E20C18"],
            [0.8, "#50A5F1"],
            [1, "#34C38F"],
          ],
          width: 10,
        },
      },
      data: [{ value: 30, name: "" }],
    },
  ],
};

setInterval(function () {
  var id = JSON.parse($("#cihazId").text());
  $.get("http://www.ai-sens.com/getAmpData3/:" + id, function (response2) {
    option.series[0].data[0].value = response2;
    myChart2.setOption(option, true);
  });
}, 2000);
if (option && typeof option === "object") {
  myChart2.setOption(option, true);
}
