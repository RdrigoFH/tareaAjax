document.addEventListener("DOMContentLoaded", function() {
   fetch('data.json')
     .then(response => response.json())
     .then(data => processData(data))
     .catch(error => console.error('Error fetching data:', error));
     
})