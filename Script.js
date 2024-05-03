fetch('./Data/Data.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
console.log(json.head);
console.log(json.Projects.Project_num);