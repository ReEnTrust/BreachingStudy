function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i];
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.innerHTML;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var HotelNamesString = "Hotel Minerve Paris;Hotel Napoléon;Murano Urban Resort;Hotel de L'Europe;Hotel de la Trémoille;Hotel Verneuil;Hotel Victorianne;Hotel Victoria;Champs-Elysees Plaza;Waldorf Arc de Triomphe Hotel & Spa;Hotel de France;La Villa Maillot & Spa ****;Hotel Best Western;BLC Design Hotel;Entrée des artistes;Hotel Wilson Opera;Oops! Hostel;Adagio Bercy Aparthotel;InterContinental;Hotel Cervantes 3*;Hotel Mercure;Quality hotel;Hotel De Belfort Paris;Timhotel;Hotel Littre****;Citadines Hotel;Hotel Abbatial Saint-Germain;Adagio City Aparthotel Paris Bercy;Alfa Hotel Nation Paris;Hotel de Rocroy;Hotel Ibis;Hotel Rochester ****;Hotel Montparnasse;B&B Hotel;Ibis Jenmapes;Le Royal Voltaire;Holiday Inn;Chateau De Courtalain;Citéa - Porte de Charenton;Comfort Hotel;Ibis Styles;Etap Hotel Porte D' Orleans;Timhotel;Hotel Louvre-Rivoli;Waytostay;Hotel Napa;Hotel De Turenne;Hi-Matic/Hi-Life;Paris Hotel Gare de Lyon;Centres Internationaux de Séjours à Paris;Best Western Astoria Opera;Hotel Salomon de Rotschild;Hotel Médian;The Peninsula Paris;Best Western Premier Trocadero;Quai de la Marne;Hipotel;Timhotel;Hotel Eiffel Saint-Charles;Hotel Relais Saint-Charles;Hotel Fiat;Hotel Crimée;Legend Hotel;Vélib' [16-18];Duplex Belidor;Adagio Access - Porte De Charenton;Hotel RIBERA;Ibis Budget;Hotel Ares Eiffel;Ibis Budget;Hotel FABRIC;Quality Hotel Opera Saint-Lazare;Holiday Inn Paris - Saint-Germain-des-Prés;Best Western Premier Hotel Pergolese;Citea Residence Paris Porte De Charenton-le-Pont;Terrasse du Printemps Haussman";
    
var countries = HotelNamesString.split(';');

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("InputHotelName"), countries);