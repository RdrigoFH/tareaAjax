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
   }   
})