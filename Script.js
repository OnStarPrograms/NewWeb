var track = 0;
var jsonner;
var MChoice = 1;
var track = 0;

function setJsoner(json)
{
    jsonner = json;
    Fetched();
}

function loadData()
{
    document.getElementById("Text").innerHTML = "";
    document.getElementById("Text").innerHTML = jsonner.Information[Math.abs(track)].Data.Data_Text;
    var image = jsonner.Information[Math.abs(track)].Data.image;
    if (image[0] == true)
    {
        if (image[1] == "center")
        {
            for (var i = 2; i < image.length; i++)
            {
                document.getElementById("Text").innerHTML += '<img id = "Image" src = "'+image[i]+'" alt = "MaxWell">';
            }
        }
    }
}

function Fetched()
{
    document.body.classList.toggle("Visible2");
    window.scrollTo(0,0);
    timeout = setTimeout(alertFunc, 30);
    track = track%jsonner.Information.length
    console.log(jsonner.Information[0].head);
    console.log(jsonner.Projects[0].Project_Name);
    document.getElementById("Center").innerHTML = "";
    if (MChoice == 1)
    {
        document.getElementById("Center").innerHTML += "<h3>I'm</h3><h1>></h1>";
        document.getElementById("Center").innerHTML += "<h2 id = 'color_"+Math.abs(track)+"' onclick = 'TogglePage();' class='noselect'>"+jsonner.Information[Math.abs(track)].head+"</h2>";
        document.getElementById("Center").innerHTML += "<h2 id = 'UnderScore'>_</h2>";
    }
    else
    {
        document.getElementById("Center").innerHTML += "<p style = 'position: fixed; top: 0%; padding-top: 0; font-size:1em; left: 0.5%;'>I'm</p><h3 id = 'color_"+Math.abs(track)+"' style = 'font-size: 3em; margin-left: 2%; position: fixed; width:100%; top:0; padding-top:1%; padding-bottom:20px;' onclick = 'TogglePage();' class='noselect navBar'>"+jsonner.Information[Math.abs(track)].head+"</h3>";
        document.getElementById("Center").innerHTML += "<br class = 'breakline'>"

        loadData();
    }
    choices(MChoice);
}

function TogglePage()
{
    if (MChoice == 1)
    {
        MChoice = 2;
    }
    else
    {
        MChoice = 1;
    }
    // if (track == 0)
    // {
    //     document.body.classList.toggle("Visible2");
    //     track++;
    // }
    document.body.classList.toggle("Visible");
    window.scrollTo(0,0);
    timeout = setTimeout(alertFunc, 50);
    Fetched();
}

function alertFunc() {
    document.body.classList.toggle("Visible2");
}

function choices(choice)
{
    document.getElementById("Choices").innerHTML = "";
    if (choice == 1)
    {
        document.getElementById("Choices").innerHTML += '<div id = "SeeMore" onclick="TogglePage();" class="noselect">See More</div>'
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