let dades;
let PokeArray = [];

let arrayLabels = [];
let arrayDades = [];
let backgroundColor = [];
let borderColor = [];

fetch("json/js/data/pokemon.json")
  .then((response) => response.json())
  .then((data) => {
    dades = data.pokemon;

    /*for (i = 0; i < dades.length; i++) {
      PokeArray.push([
        dades[i].name,
        dades[i].id,
        dades[i].img,
        dades[i].weight,
      ]);

      for (j = 0; j < dades[i].type.length; j++) {
        //includes
        if (arrayLabels.includes(dades[i].type[j])) {
        } else {
          arrayLabels.push(dades[i].type[j]);
        }
      }

    }
    */

    dades.forEach(pokemon => {
      PokeArray.push([
        pokemon.name,
        pokemon.id,
        pokemon.img,
        pokemon.weight,
      ]);

      pokemon.type.forEach(type => {
        if (!arrayLabels.includes(type)) {
          arrayLabels.push(type);
        }
      })

      pokemon.type.forEach(type => {
        let color1 = Math.random()*256;
        let color2 = Math.random()*256;
        let color3 = Math.random()*256;
    
        backgroundColor.push("rgba("+ color1 + "," + color2 + "," + color3 + ", 0.5)");
        borderColor.push("rgb(" + color1 + "," + color2 + "," + color3 + ")");
      })
    });

    /*for (i = 0; i < arrayLabels.length; i++) {
      let color1 = Math.random()*256;
      let color2 = Math.random()*256;
      let color3 = Math.random()*256;
  
      backgroundColor.push("rgba("+ color1 + "," + color2 + "," + color3 + ", 0.5)");
      borderColor.push("rgb(" + color1 + "," + color2 + "," + color3 + ")");
      
    }*/
   
    console.log(PokeArray);
    printList(PokeArray);
    createGraph();
  });

function boton1() {
  location.reload();
}

function boton2() {
  //Ordena l'array inicial ascendentment
  document.getElementById("resultat").innerHTML = "";
  PokeArray.sort();
  printList(PokeArray);
}

function boton3() {
  //Ordena l'array inicial descendentment
  document.getElementById("resultat").innerHTML = "";
  PokeArray.sort().reverse();
  printList(PokeArray);
}

function boton4() {
  //Funció que busca per nom a l'array inicial
  busca = prompt("Quin Pokémon vols buscar?");
  pokemonbuscat = PokeArray.indexOf(busca);
  document.getElementById("resultat").innerHTML = dades[pokemonbuscat].name;

  let table = document.createElement("table");
  let body = document.createElement("body");
  
    for (i = 0; i < PokeArray.length; i++) {
      if(PokeArray[i][0]==pokemonbuscat){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = PokeArray[i][0];
        let td2 = document.createElement("td");
        td2.innerText = PokeArray[i][1];
        let td3 = document.createElement("td");
        td3.innerHTML = '<img src="' + PokeArray[i][2] + '" />';
        let td4 = document.createElement("td");
        td4.innerText = PokeArray[i][3];
        tr.appendChild(td);
 document.getElementById("resultat").appendChild(table);
      }
    }
}

function boton5() {
  let suma = 0;
  let mitjana = "";
  for (i = 0; i < PokeArray.length; i++) {
    suma += parseFloat(PokeArray[i][3]);
  }
  mitjana = suma / 151;
  alert("La mitjana és: "+ mitjana.toFixed(2) + " kg"); 
}

function printList(pokArr) {
    document.getElementById("resultat").innerHTML = "";
    
    let table = document.createElement("table");
    let body = document.createElement("body");
  
    for (i = 0; i < pokArr.length; i++) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.innerText = pokArr[i][0];
      let td2 = document.createElement("td");
      td2.innerText = pokArr[i][1];
      let td3 = document.createElement("td");
      td3.innerHTML = '<img src="' + pokArr[i][2] + '" />';
      let td4 = document.createElement("td");
      td4.innerText = pokArr[i][3];
      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      body.appendChild(tr);
      table.appendChild(body);
      document.getElementById("resultat").appendChild(table);
    }
}

let inputSearch = document.getElementById('txtSearch')
inputSearch.addEventListener('input', (e) => {
  console.log(inputSearch.value);

  let filtrat = PokeArray.filter(function(element){
    return element[0].toLowerCase().includes(inputSearch.value);
  })
console.log(filtrat);
  printList(filtrat);
});
 
function createGraph(){
  const data = {
    labels: arrayLabels,
    datasets: [
      {
        label: "My First Dataset",
        data: [14,33,12,19,32,12,24,9,14,8,14,11,5,3,3],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      },
    ],
  };
  
  const config = {
    type: "polarArea",
    data: data,
    options: {},
  };
  
  const myChart = new Chart(document.getElementById("myChart"), config); 
}
