function Fetched(json)
{
    console.log(json.Information[0].head);
    console.log(json.Projects[0].Project_Name);
    for (let i = 0; i < json.Information.length; i++)
    {
        document.getElementById("Center").innerHTML += "<h1>"+json.Information[i].head+"</h1>";
    }
}


//https://test.starprograms.dev/Data/Data.json - WebJson
//.Data/Data.json - Local Json
fetch('https://test.starprograms.dev/Data/Data.json') 
    .then((response) => response.json())
    .then((json) => Fetched(json));