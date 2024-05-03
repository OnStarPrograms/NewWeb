function Fetched(json)
{
    console.log(json.head);
    console.log(json.Projects[0].Project_Name);
}

fetch('https://test.starprograms.dev/Data/Data.json')
    .then((response) => response.json())
    .then((json) => Fetched(json));