fetch('./Data/Data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));