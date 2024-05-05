function Fetched(json)
{
    console.log(json.Information[0].head);
    console.log(json.Projects[0].Project_Name);
    document.getElementById("Center").innerHTML += "<h3>I'm</h3><h1>></h1>";
    document.getElementById("Center").innerHTML += "<h2>"+json.Header.Names[0]+"</h2>";
    // for (let i = 0; i < json.Header.Names.length; i++)
    // {
    //     document.getElementById("Center").innerHTML += "<h2>"+json.Header.Names[i]+"</h2>";
    // }
}


//https://test.starprograms.dev/Data/Data.json - WebJson
//.Data/Data.json - Local Json
fetch('https://test.starprograms.dev/Data/Data.json') 
    .then((response) => response.json())
    .then((json) => Fetched(json));