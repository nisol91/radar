// c è qualche aereo che non ha abbastanza
// carburante per atterrare in un qualsiasi aeroporto?
$(document).ready(function() {

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
    fuel:50,
    'km/kg':5,
  },
  {
    lat:66.0,
    long:20,
    fuel:50,
    'km/kg':1,
  }
]
var aeroporti = [
  {
    lat:40,
    long:10,
  },
  {
    lat:50,
    long:15,
  },
]

function measure(lat1, lon1, lat2, lon2){ //haversine formula
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI/180 - lat1 * Math.PI/180;
    var dLon = lon2 * Math.PI/180 - lon1 * Math.PI/180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d ; // km
}



  for (var i = 0; i < aerei.length; i++) {
    //estraggo dal mio db i vari valori e li metto dentro a delle variabili
    var lat_aer = aerei[i].lat
    var long_aer = aerei[i].long
    // console.log(lat_aer);
    // console.log(long_aer);
    var carb = aerei[i].fuel
    var efficienza = aerei[i]['km/kg']
    console.log('carburante =' + carb);
    console.log('efficienza =' + efficienza);
    var autonomia = carb*efficienza
    console.log('autonomia =' + autonomia);



    for (var j = 0; j < aeroporti.length; j++) {
      //estraggo dal mio db i vari valori e li metto dentro a delle variabili

      var lat_airport = aeroporti[j].lat
      var long_airport = aeroporti[j].long
      // console.log(lat_aer);
      // console.log(long_aer);


      //calcolo le posizioni rispetto a origine: utilizzo una funzione che mi permette di calcolare
      //le distanze di due posizioni di latitudine nota in km.

      var dist = measure(lat_aer, long_aer, lat_airport, long_airport)
      console.log('distanza =' + dist);


      //prima avevo utilizzato la formula di distanza fra due punti, ma non avrei saputo come convertire le
      //distanze fra due punti di coord geografiche note in km.

      // var dist = Math.sqrt(Math.abs(Math.pow((lat_airport - lat_aer), 2)) + Math.abs(Math.pow((long_airport - long_aer), 2)))


      if (dist > autonomia) {
        console.log('pericolo');
      } else {
        console.log('ok');
      }

    }
  }


});
