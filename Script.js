var track = 0;
var jsonner;
var MChoice = 2;

function setJsoner(json)
{
    jsonner = json;
    Fetched();
}

function Fetched()
{
    track = track%jsonner.Header.Names.length
    console.log(jsonner.Information[0].head);
    console.log(jsonner.Projects[0].Project_Name);
    document.getElementById("Center").innerHTML = "";
    if (MChoice == 1)
    {
        document.getElementById("Center").innerHTML += "<h3>I'm</h3><h1>></h1>";
        document.getElementById("Center").innerHTML += "<h2 id = 'color_"+Math.abs(track)+"'>"+jsonner.Header.Names[Math.abs(track)]+"</h2>";
        document.getElementById("Center").innerHTML += "<h2 id = 'UnderScore'>_</h2>";
    }
    else
    {
        document.getElementById("Center").innerHTML += "<h3 id = 'color_"+Math.abs(track)+"'>"+jsonner.Header.Names[Math.abs(track)]+"</h3>";
    }
    choices(MChoice);
}

function choices(choice)
{
    document.getElementById("Choices").innerHTML = "";
    if (choice == 1)
    {
        document.getElementById("Choices").innerHTML += '<div id = "SeeMore" onclick=";" class="noselect">See More</div>'
        document.getElementById("Choices").innerHTML += '<a id = "BackLine" onclick="track--;Fetched();" class = "noselect"><</a>'
        document.getElementById("Choices").innerHTML += '<a id = "NextLine" onclick="track++;Fetched();" class = "noselect">></a>'
    }
    else
    {
        document.getElementById("Choices").innerHTML += '<a id = "BackLine_" onclick="track--;Fetched();" class = "noselect"><</a>'
        document.getElementById("Choices").innerHTML += '<a id = "NextLine_" onclick="track++;Fetched();" class = "noselect">></a>'
    }
}

function ToggleDarkMode()
{
    document.body.classList.toggle("dark");
}

//https://test.starprograms.dev/Data/Data.json - WebJson
//.Data/Data.json - Local Json
fetch('https://test.starprograms.dev/Data/Data.json') 
    .then((response) => response.json())
    .then((json) => setJsoner(json));