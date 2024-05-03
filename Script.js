function Fetched(json)
{
    console.log(json.Information[0].head);
    console.log(json.Projects[0].Project_Name);
}

fetch('.Data/Data.json') //.Data/Data.json
    .then((response) => response.json())
    .then((json) => Fetched(json));