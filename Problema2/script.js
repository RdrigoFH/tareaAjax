document.addEventListener("DOMContentLoaded", function() {
   fetch('data.json')
     .then(response => response.json())
     .then(data => processData(data))
     .catch(error => console.error('Error fetching data:', error));
     
     function processData(regionsData) {
      const data = {
        labels: [],
        datasets: []
      };
  
      const excludedRegion = "Lima";
      const excludedRegion2 = "Callao";
  
      regionsData.forEach(region => {
        if (region.region !== excludedRegion && region.region !== excludedRegion2 ) {
          region.confirmed.forEach(day => {
            const date = new Date(day.date);
            const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
            if (!data.labels.includes(formattedDate)) {
              data.labels.push(formattedDate);
            }
          });
        }
      });
      regionsData.forEach(region => {
        if (region.region !== excludedRegion && region.region !== excludedRegion2) {
          const dataset = {
            label: region.region,
            data: [],
            borderColor: getRandomColor(),
            fill: false
          };
  
          data.labels.forEach(label => {
            const matchingDay = region.confirmed.find(day => {
              const date = new Date(day.date);
              const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
              return formattedDate === label;
            });
  
            if (matchingDay) {
              dataset.data.push(matchingDay.value);
            } else {
              dataset.data.push(0);
            }
          });
  
          data.datasets.push(dataset);
        }
        const ctx = document.getElementById('confirmedChart').getContext('2d');
     const confirmedChart = new Chart(ctx, {
       type: 'line',
       data: data,
       options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
           xAxes: [{
             type: 'time',
             time: {
               unit: 'day',
               tooltipFormat: 'MMM DD, YYYY'
             },
             scaleLabel: {
               display: true,
               labelString: 'Date'
             }
           }],
           yAxes: [{
             scaleLabel: {
               display: true,
               labelString: 'Confirmed Cases'
             }
           }]
         }
       }
     });

      });
 
   }   

})