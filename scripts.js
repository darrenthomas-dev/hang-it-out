$(document).ready(function() {
    var latLon = [];
    var location = {
        'id' : '',
        'site' : ''
    };

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);         
        } else {
            alert("Browser does not support geolocation");
        }
    };

    function getClosestSite() {
        $.getJSON('sitelist.json', function(data) {
            var closest, locations, output = [], standpoint, i;
			// parse the sitelist.json data into an array of Location objects
            locations = parseJSON(data);
			// where you are
            standpoint = new Location(null, "", latLon[0], latLon[1]);
			// just interested in the closest location in the list
            closest = getNearest(standpoint, locations);
			// Name and ID
            console.log(closest.location.name);
            console.log(closest.location.id);
            location['id'] = closest.location.id;
            location['site'] = closest.location.name;
        }).fail(function(jqxhr, textStatus, error) {
            alert("Request Failed: " + textStatus + ', ' + error);
        });
    };

    function geoSuccess(position) {
        let lat = position.coords.latitude; 
        let lon = position.coords.longitude;
        // document.getElementById('lat').innerText = lat;
        // document.getElementById('lon').innerText = lon;
        console.log(lat + ", " + lon);
        latLon.push(lat,lon);
        console.log(latLon);
        getClosestSite();
        return latLon;
    }

    function geoError(error) {
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Geolocate PERMISSION_DENIED: " + error.message);
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Geolocate POSITION_UNAVAILABLE: " + error.message);
            break;
        case error.TIMEOUT:
            alert("Geolocate TIMEOUT: " + error.message);
            break;
        default:
            alert("Geolocate code " + error.code + ': ' + error.message);
            break;
        }
    }

});