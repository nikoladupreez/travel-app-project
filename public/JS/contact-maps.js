let map;

function contactMap() {
    let mapProp= {
                    center: {lat: 52.370850, lng: 4.883140},
                    zoom: 8,
                 };
    map = new google.maps.Map(document.getElementById("maps"), mapProp);
 };