(function(){
    var button = document.getElementById("calculate");
    button.setAttribute('onclick', 'runCalculations()');
    //
})();

function runCalculations(){
    var targetDistance = document.getElementById('targetDistance').value;
    var targetPlanetList = document.getElementById('targetPlanet');
    var targetPlanet = 'Neptune';
    var farthestDistance = 0;
    if(targetPlanetList.selectedIndex > 0){
        targetPlanet = targetPlanetList.options[targetPlanetList.selectedIndex].value;
    }
    var calculatedSystem = [];
    var SunDiameter = 0;
    // First, find the target planet.
    for(var i = 0; i < planets.length; i++){
        if(planets[i].Name == targetPlanet){
            // Distance Percent is the percentage of the Sun's diameter that the average distance for the planet
            SunDiameter = targetDistance / planets[i].Distance_percent;
            break;
        }
    }
    var container = document.getElementById('calculations-container');
    container.removeAttribute("style");
    var output = document.getElementById('calculations');
    output.innerHTML = "";
    // Output Calculations
    for(var i = 0; i < planets.length; i++){
        var div = document.createElement('tr');
        var diameter = SunDiameter * planets[i].Diameter_percent;
        var distance = SunDiameter * planets[i].Distance_percent;
        div.innerHTML = '<td>' + planets[i].Name + '</td>'
                      + '<td class="number">' + convertToFeetAndInches(diameter) + '</td>'
                      + '<td class="number">' + convertToFeetAndInches(distance) + '</td>';
        output.appendChild(div);
        if(planets[i].Name == targetPlanet){
            break;
        }
    }
}

function convertToFeetAndInches(rawNumber){
    var convertedDisplay = '';
    //var totalInches = rawNumber * 12;
    var feet = Math.floor(rawNumber);
    var inches = ((rawNumber - feet) * 12).toFixed(2);
    if(feet > 0){
        convertedDisplay = feet + ' ft.'
    }
    if(feet > 0 && inches > 0){
        convertedDisplay += ', ';
    }
    if(inches > 0){
        convertedDisplay += inches + ' in.';
    }
    
    return convertedDisplay;
}
