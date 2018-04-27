$(document).ready(function() {
    var table = document.getElementById("TableResult");
    $(table).on('click', function() {
        var showTable = document.getElementById("resultTable");
        var screen = document.getElementById("formInit");
        showTable.style.display = "block";
        screen.style.display = "none";
    });
    var map = document.getElementById("MapResult");
    $(map).on('click', function() {
        var showMap = document.getElementById("resultMap");
        var screen = document.getElementById("formInit");
        showMap.style.display = "block";
        screen.style.display = "none";
    });
    
    var map2 = document.getElementById("MapCrimeResult");
    $(map2).on('click', function() {
        var showMap = document.getElementById("resultMap2");
        var screen = document.getElementById("formInit");
        showMap.style.display = "block";
        screen.style.display = "none";
    });
    
    var back12 = document.getElementById("back1");
    $(back12).on('click', function() {
        var showTable = document.getElementById("resultTable");
        var screen = document.getElementById("formInit");
        showTable.style.display = "none";
        screen.style.display = "block";
    });
    var back22 = document.getElementById("back2");
    $(back22).on('click', function() {
        var showMap = document.getElementById("resultMap");
        var screen = document.getElementById("formInit");
        showMap.style.display = "none";
        screen.style.display = "block";
    });
    var back33 = document.getElementById("back3");
    $(back33).on('click', function() {
        var showMap = document.getElementById("resultMap2");
        var screen = document.getElementById("formInit");
        showMap.style.display = "none";
        screen.style.display = "block";
    });
    var search = document.getElementById("search");
    $(search).on('click', function() {

        var title = document.getElementById("year2");
        title.value = "";
        var year = document.getElementById("year");
        console.log(year.value);
        title.value += year.value;
        initMap();
    });
   var searchC = document.getElementById("searchCrime");
    $(searchC).on('click', function() {

        var title = document.getElementById("crime2");
        title.value = "";
        var crime = document.getElementById("crime");
        console.log(crime.value);
        title.value += crime.value;
        crimeMap();
    });
});

function initMap() {
    var uluru = { lat: 41.881832, lng: -87.623177 };
    var map = new google.maps.Map (document.getElementById("map"), {
        zoom: 13,
        center: uluru
    });
    var year = document.getElementById("year");
    var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?year=" + $("#year2").val();
    $.get(url, function(response) {
        console.log(url);
        $.each(response, function(i, v) {
            var contentString = "Location: " + v.block 
            + "<br>Date & Time: " + v.date + "<br>Crime: " + v.primary_type + "<br> Took Place In: " + v.location_description 
            + "<br> Arrested: " + v.arrest;
                if(v.arrest === true){
                var marker = new google.maps.Marker ({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                });
                }
                if(v.arrest === false){
                    var marker = new google.maps.Marker ({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                }
                 var info = new google.maps.InfoWindow({
                     content: contentString
                 });
                 marker.addListener('click', function() {
                    info.open(map, marker);
                });
        });
    });
}

function crimeMap() {
    var uluru = { lat: 41.881832, lng: -87.623177 };
    var map2 = new google.maps.Map (document.getElementById("map2"), {
        zoom: 13,
        center: uluru
    });
    var crime = document.getElementById("crime");
    var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?primary_type=" + $("#crime2").val();
    $.get(url, function(response) {
        console.log(url);
        $.each(response, function(i, v) {
            var contentString = "Location: " + v.block 
            + "<br>Date & Time: " + v.date + "<br>Crime: " + v.primary_type + "<br> Took Place In: " + v.location_description 
            + "<br> Arrested: " + v.arrest;
                if(v.arrest === true){
                var marker = new google.maps.Marker ({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map2,
                    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                });
                }
                if(v.arrest === false){
                    var marker = new google.maps.Marker ({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map2,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                }
                 var info = new google.maps.InfoWindow({
                     content: contentString
                 });
                 marker.addListener('click', function() {
                    info.open(map2, marker);
                });
        });
    });
}