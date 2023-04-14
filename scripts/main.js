var millisecTime = 0;
var offset = Date.now();

let interval = null;
let timerRunning = false;

document.addEventListener("keydown", e => { if(e.key === " ") playPause();});
document.addEventListener("mousedown", e => { e.preventDefault();});

function stopwatch() 
{
    function delta() 
    {
        var timePassed = Date.now() - offset;
        offset = Date.now();
        return timePassed;
    }

    millisecTime += delta();
    var secTime = Math.round(millisecTime / 10) / 100;

    var secs = Math.round((secTime % 60) * 100) / 100;
    var mins = Math.floor(secTime / 60) % 60;
    var hours = Math.floor(secTime / 3600) % 24;
    var days = Math.floor(secTime / 86400);

    var showSecs = secs.toString();
    var showMins = mins.toString();
    var showHours = hours.toString();

    document.getElementById("display").innerHTML = timeFormater();
    document.title = "Stopwatch " + titleFormatter();

    function timeFormater() 
    {
        if (days > 0) 
        {
            if (showHours.length === 1) showHours = "0" + showHours;
            showSecs = Math.floor(secs).toString();
        }
        else if (hours > 0)
        {
            showSecs = (Math.floor(secs * 10) / 10).toString();
            if (showSecs.length === 1 || showSecs.length === 2) showSecs += ".0";
        }
        else
        {
            if (secs >= 10) {
                if (showSecs.length === 2) showSecs += ".00";
                else if (showSecs.length === 4) showSecs += "0"; }
            else {
                if (showSecs.length === 1) showSecs += ".00";
                else if (showSecs.length === 3) showSecs += "0"; }
        }
        
        if (secTime > 3600 && showMins.length === 1) showMins = "0" + showMins;
        if (secTime > 60 && secs < 10) showSecs = "0" + showSecs;
        
        if (days > 0) return days.toString() + ":" + showHours + ":" + showMins + ":" + showSecs;
        else if (hours > 0) return showHours + ":" + showMins + ":" + showSecs;
        else if (mins > 0) return showMins + ":" + showSecs;
        else return showSecs;
    }

    function titleFormatter()
    {
        secs = Math.floor(secs);
        showSecs = secs.toString()
        
        if (showSecs.length === 1) showSecs = "0" + showSecs;
        if (showMins.length === 1) showMins = "0" + showMins; 
        if (showHours.length === 1) showHours = "0" + showHours; 

        if (days > 0) return days.toString() + ":" + showHours + ":" + showMins + ":" + showSecs;
        else if (hours > 0)  return showHours + ":" + showMins + ":" + showSecs;
        else return showMins + ":" + showSecs;
    }
}

function playPause() 
{
    if (timerRunning) 
    {
        window.clearInterval(interval);
        document.title += " (Paused)";
    }
    else
    {
        offset = Date.now();
        interval = window.setInterval(stopwatch, 10);
    } 
    
    timerRunning = !timerRunning;
    document.getElementById("playPause").innerHTML = timerRunning? "Stop": "Play";
}

function reset() 
{
    window.clearInterval(interval);
    timerRunning = false;
    millisecTime = 0;
    document.title = "Stopwatch";
    document.getElementById("display").innerHTML = "0.00";
    document.getElementById("playPause").innerHTML = "Play";
}