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

    var search = document.getElementById("search");
    $(search).on('click', function() {

        var title = document.getElementById("year2");
        title.value = "";
        var year = document.getElementById("year");
        console.log(year.value);
        title.value += year.value;
        initMap();
    });

});

function initMap() {
    var uluru = { lat: 41.881832, lng: -87.623177 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: uluru
    });
    var year = document.getElementById("year");
    var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?year=" + year.value;
    $.get(url, function(response) {
        $.each(response, function(i, v) {
            var contentString = "Location: " + v.block + "<br>" + "Date & Time: " +v.date + "<br>" + "Crime: " + v.primary_type;
            var marker = new google.maps.Marker({
                position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                map: map,
                icon: "http://maps.google.com/mapfiles/kml/pal3/icon35.png"
            });
            
            var info = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function(){
                info.open(map, marker);
            });
        });
    });
}
