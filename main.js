// c è qualche aereo che non ha abbastanza
// carburante per atterrare in un qualsiasi aeroporto?
$(document).ready(function() {


//database aeroporti e aerei

//coordinate espresse in gradi decimali DD
var aerei = [
  {
    lat:44.5,
    long:10.2,
    fuel:50,
    'km/kg':13,
  },
  {
    lat:50.7,
    long:10.8,
    fuel:200,
    'km/kg':5,
  },
  {
    //milano
    lat:45.4,
    long:9.1,
    fuel:50,
    'km/kg':1,
  },
  {
    //bologna
    lat:44.5,
    long:11.3,
    fuel:50,
    'km/kg':1,
  }
]
var aeroporti = [
  {
    //parma
    lat:44.8,
    long:10.33,
  },
  {
    lat:50,
    long:15,
  },
]


//----
//funzione per calcolare la distanza in km tra due punti di coordinate note (lat,long)
function measure(lat1, lon1, lat2, lon2){ //haversine formula
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI/180 - lat1 * Math.PI/180;
    var dLon = lon2 * Math.PI/180 - lon1 * Math.PI/180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d ; // distanza in km
}

//------
//ora due cicli for: per ogni aereo controllo tutti gli aeroporti.

for (var i = 0; i < aerei.length; i++) {
  console.log('AEREO ' + (i + 1));
  //estraggo dal mio db i vari valori e li metto dentro a delle variabili
  var lat_aer = aerei[i].lat
  var long_aer = aerei[i].long
  // console.log(lat_aer);
  // console.log(long_aer);
  var carb = aerei[i].fuel
  var efficienza = aerei[i]['km/kg']
  console.log('carburante = ' + carb + ' kg');
  console.log('efficienza = ' + efficienza + ' km/kg');
  var autonomia = carb*efficienza
  console.log('autonomia = ' + autonomia + ' km');



  for (var j = 0; j < aeroporti.length; j++) {
    console.log('aeroporto ' + (j + 1));

    //estraggo dal mio db i vari valori e li metto dentro a delle variabili

    var lat_airport = aeroporti[j].lat
    var long_airport = aeroporti[j].long
    // console.log(lat_aer);
    // console.log(long_aer);


    //calcolo le posizioni rispetto a origine: utilizzo una funzione che mi permette di calcolare
    //le distanze di due posizioni di latitudine nota in km.

    var dist = measure(lat_aer, long_aer, lat_airport, long_airport).toFixed(2);
    console.log('distanza = ' + dist + ' km');

    //-----------
    //prima avevo utilizzato la formula di distanza fra due punti, ma non avrei saputo come convertire le
    //distanze fra due punti di coord geografiche note in km.

    // var dist = Math.sqrt(Math.abs(Math.pow((lat_airport - lat_aer), 2)) + Math.abs(Math.pow((long_airport - long_aer), 2)))
    //-----------

    //-----------
    //infine controllo se l autonomia e' sufficiente
    if (dist > autonomia) {
      console.log('pericolo');
    } else {
      console.log('ok');
    }
  }
}


});
