$(document).ready(function() {
    //show the div screen of table searched by year
    //hide the search div screen
    var table = document.getElementById("TableResult");
    $(table).on('click', function() {
        var showTable = document.getElementById("resultTable");
        var screen = document.getElementById("formInit");
        showTable.style.display = "block";
        screen.style.display = "none";
    });
    //show the div screen of results map through searching by year
    //hide the search div screen
    var map = document.getElementById("MapResult");
    $(map).on('click', function() {
        var showMap = document.getElementById("resultMap");
        var screen = document.getElementById("formInit");
        showMap.style.display = "block";
        screen.style.display = "none";
    });
    
    //show the div screen of table searched by specific crime
    //hide the search div screen
    var table2 = document.getElementById("TableCrimeResult");
    $(table2).on('click', function() {
        var showTable = document.getElementById("resultTable2");
        var screen = document.getElementById("formInit");
        showTable.style.display = "block";
        screen.style.display = "none";
    });
    
    //show the div screen of results map through searching by specific crime
    //hide the search div screen
    var map2 = document.getElementById("MapCrimeResult");
    $(map2).on('click', function() {
        var showMap = document.getElementById("resultMap2");
        var screen = document.getElementById("formInit");
        showMap.style.display = "block";
        screen.style.display = "none";
    });

    //go back to the search screen and hide the result table found by searching by year
    var back12 = document.getElementById("back1");
    $(back12).on('click', function() {
        var showTable = document.getElementById("resultTable");
        var screen = document.getElementById("formInit");
        showTable.style.display = "none";
        screen.style.display = "block";
    });
    
    //go back to the search screen and hide the result map found by search using year
    var back22 = document.getElementById("back2");
    $(back22).on('click', function() {
        var showMap = document.getElementById("resultMap");
        var screen = document.getElementById("formInit");
        showMap.style.display = "none";
        screen.style.display = "block";
    });
    
    //go back to the search screen and hide the result map found by search using specific crime
    var back33 = document.getElementById("back3");
    $(back33).on('click', function() {
        var showMap = document.getElementById("resultMap2");
        var screen = document.getElementById("formInit");
        showMap.style.display = "none";
        screen.style.display = "block";
    });

    //go back to the search screen and hide the result table found by search using specific crime
    var back44 = document.getElementById("back4");
    $(back44).on('click', function() {
        var showMap = document.getElementById("resultTable2");
        var screen = document.getElementById("formInit");
        showMap.style.display = "none";
        screen.style.display = "block";
    });
    
    //execute the search by year function and display the year on the map result screen
    var search = document.getElementById("search");
    $(search).on('click', function() {

        var title = document.getElementById("year2");
        title.value = "";
        var year = document.getElementById("year");
        console.log(year.value);
        title.value += year.value;
        initMap();
    });
    
    //execute the search by specific crime function and display that crime on the map result screen
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

//function to display the results 
function initMap() {
    //create the inital map
    var uluru = { lat: 41.881832, lng: -87.623177 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: uluru
    });
    
    //make the table
    var table = document.getElementById("resultTable");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var year = document.getElementById("year");
    var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?year=" + $("#year2").val
    //get the data 
    $.get(url, function(response) {
        console.log(url);
        $.each(response, function(i, v) {
            
            //add the table to the table
            var DT = String(v.date);
            var split = DT.split("T");
            var row = document.createElement("tr");
            for (var a = 0; a <= 5; a++) {
                var cell = document.createElement("td");
                var cellText;
                if (a === 0) {
                    cellText = document.createTextNode(v.block);
                }
                if (a === 1) {
                    cellText = document.createTextNode(v.primary_type);
                }
                if (a === 2) {
                    cellText = document.createTextNode(split[0]);
                }
                if (a === 3) {
                    cellText = document.createTextNode(split[1]);
                }
                if (a === 4) {
                    cellText = document.createTextNode(v.location_description);
                }
                if (a === 5) {
                    cellText = document.createTextNode("Arrested = " + v.arrest);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
            
            //create the content of the marker
            var contentString = "Location: " + v.block +
                "<br>Date & Time: " + v.date + "<br>Crime: " + v.primary_type + "<br> Took Place In: " + v.location_description +
                "<br> Arrested: " + v.arrest;
            if (v.arrest === true) {
                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                });
            }
            if (v.arrest === false) {
                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
            }
            
            //add content to marker
            var info = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener('click', function() {
                info.open(map, marker);
            });
        });
        
        //show the table itself
        tbl.appendChild(tblBody);
        table.appendChild(tbl);
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width", "100%");
    });
}

//function to display results by crime
function crimeMap() {
    //create and show the map
    var uluru = { lat: 41.881832, lng: -87.623177 };
    var map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 13,
        center: uluru
    });
    var crime = document.getElementById("crime");
    var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?primary_type=" + $("#crime2").val();
    $.get(url, function(response) {
        //create the initial empty table
        var table = document.getElementById("resultTable2");
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        $.each(response, function(i, v) {
            //add datata to the table
            var DT = String(v.date);
            var split = DT.split("T");
            var row = document.createElement("tr");
            for (var a = 0; a <= 4; a++) {
                var cell = document.createElement("td");
                var cellText;
                if (a === 0) {
                    cellText = document.createTextNode(v.block);
                }
                if (a === 1) {
                    cellText = document.createTextNode(split[0]);
                }
                if (a === 2) {
                    cellText = document.createTextNode(split[1]);
                }
                if (a === 3) {
                    cellText = document.createTextNode(v.location_description);
                }
                if (a === 4) {
                    cellText = document.createTextNode("Arrested = " + v.arrest);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
            
            //create the content of the marker
            var contentString = "Location: " + v.block +
                "<br>Date & Time: " + v.date + "<br>Crime: " + v.primary_type + "<br> Took Place In: " + v.location_description +
                "<br> Arrested: " + v.arrest;
            if (v.arrest === true) {
                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map2,
                    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                });
            }
            if (v.arrest === false) {
                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) },
                    map: map2,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
            }
            
            //add content to the marker
            var info = new google.maps.InfoWindow({
                content: contentString
            });
            
            //make the marker clickable and display content
            marker.addListener('click', function() {
                info.open(map2, marker);
            });
        });
        
        //display the data results on the table
        tbl.appendChild(tblBody);
        table.appendChild(tbl);
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width", "100%");

    });
}
