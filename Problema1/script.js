function cargarJSON(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'data.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

function crearGrafico(jsonData) {
  var data = JSON.parse(jsonData);
  var select1 = document.getElementById("provinceSelect1");
  var select2 = document.getElementById("provinceSelect2");
  var province1 = select1.options[select1.selectedIndex].value;
  var province2 = select2.options[select2.selectedIndex].value;
  var provinceData1 = data.find(item => item.region === province1);
  var provinceData2 = data.find(item => item.region === province2);
  var labels = [];
  var dataset = [];
  labels.push(province1);
  labels.push(province2);
  var confirmed1 = provinceData1.confirmed.map(function(data) {
    return data.value;
  });
  var confirmed2 = provinceData2.confirmed.map(function(data) {
    return data.value;
  });
  dataset.push(confirmed1);
  dataset.push(confirmed2);

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Confirmed Cases (' + province1 + ')',
        data: dataset[0],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: 'Confirmed Cases (' + province2 + ')',
        data: dataset[1],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
