function Fetched(json)
{
    console.log(json.head);
    console.log(json.Projects.Project_num);
}

fetch('./Data/Data.json') //https://test.starprograms.dev/Data/Data.json
    .then((response) => response.json())
    .then((json) => Fetched(json));