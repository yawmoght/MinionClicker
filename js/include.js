
function include(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function loadmain(){
	include(path+"main.js",null);
};

function useless(){

};

path="./js/";
include(path+"game.js",useless);
include(path+"building.js",useless);
include(path+"creatures.js",useless);
include(path+"savegame.js",useless);
include(path+"technology.js",useless);
include(path+"buttons.js",useless);

include(path+"other.js",loadmain);

