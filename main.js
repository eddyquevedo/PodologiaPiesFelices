/*=========================para dar dinamismo al tipeo de la ubicacion ================================*/
const app = document.getElementById('typewriter');
const typewriter = new Typewriter(app,{
    loop: true,
    delay: 75,
});

typewriter
.typeString('MANTEN TUS PIES SIEMPRE FELICES')
.pauseFor(300)
.start();
/*======================API para mostrar la temperatura y el icono en tiempo real================================*/
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=3433359&appid=6cbfe5b42c2ce238fa1098f5ea972d32`;

async function getTemperature() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperature = Math.round(data.main.temp-273.15);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weather-icon').setAttribute('src', iconUrl);
    document.getElementById('weather-icon').setAttribute('alt', data.weather[0].description);
  } catch (error) {
    console.log(error);
  }
}
getTemperature(); // Llamar a la función para mostrar la temperatura al cargar la página
setInterval(getTemperature, 600000); // Actualizar la temperatura cada 10 minutos (600000 ms)

/*======================API para mostrar el dia y en tiempo real================================*/
function showCurrentDate() {
    const now = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const formattedDate = `${dayOfWeek}, ${day}/${month}/${year}`;
    document.getElementById('current-date').textContent= formattedDate;
  }
  showCurrentDate(); // Llamar a la función para mostrar la fecha al cargar la página
  setInterval(showCurrentDate, 1000); // Actualizar la fecha cada segundo (1000 ms)

/*===JAVASCRIPT TICKETS======*/

//****** VARIABLES ***********

//evenlistener para detectar cuando hacen click en Button Resumen
let ticketsResumen = document.querySelector("#ticketsResumen");
ticketsResumen.addEventListener("click", ticketsPrice);

//evenlistener para detectar cuando hacen click en el Button Borrar
let ticketsBorrar = document.querySelector("#ticketsBorrar");
ticketsBorrar.addEventListener("click", borrarOutput);

//evenlistener para detectar cuando hacen click en el input Cantidad
let ticketsQuantity = document.querySelector(".ticketsQuantity");
ticketsQuantity.addEventListener("click", clearInput);

//evenlistener para detectar cuando hacen click en el input Categoria
let ticketsCategory = document.querySelector(".ticketsCategory");
ticketsCategory.addEventListener("click", descuento);


//eventlistener para detectar click en los div estudiante/trainee/junior
let discountStudent = document.querySelector(".estudiante");
discountStudent.addEventListener("click", updateCategory);
let discountTrainee = document.querySelector(".trainee");
discountTrainee.addEventListener("click", updateCategory);
let discountJunior = document.querySelector(".junior");
discountJunior.addEventListener("click", updateCategory);


// ******* FUNCION TICKETSPRICE *****************
function ticketsPrice(evento) {
    //Usamos preventDefault() para que no se refresque el formulario
    evento.preventDefault();

    //leemos el valor del input cantidad
    let ticketsQuantity = document.querySelector(".ticketsQuantity");

    if (Number(ticketsQuantity.value)) {
        let ticketsCategory = document.querySelector(".ticketsCategory");
        let totalPayment;

        switch (ticketsCategory.value) {
            case "Estudiante": {
                totalPayment = 200 * ticketsQuantity.value * 0.2;
                break;
            }
            case "Trainee": {
                totalPayment = 200 * ticketsQuantity.value * 0.5;
                break;
            }
            case "Junior": {
                totalPayment = 200 * ticketsQuantity.value * 0.85;
                break;
            }
        }

        document.querySelector(".ticketsOutput").textContent = `Total a pagar: $${totalPayment}`;
        let outputNode = document.querySelector(".ticketsOutput");
        let spanNode = document.createElement("span");
        spanNode.className = 'ticketsBuy';
        let textNode = document.createTextNode("Comprar");
        spanNode.append(textNode);
        outputNode.append(spanNode);

        //eventlistener para detectar click en el span ticketsBuy
        let ticketsBuy = document.querySelector(".ticketsBuy");
        ticketsBuy.addEventListener("click", ticketsSubmit);

    } else {
        document.querySelector(".ticketsQuantity").style.border = "3px solid red";
        ticketsQuantity.value = "";
        ticketsQuantity.placeholder = "Ingrese una cantidad válida";
        alert("Ingrese una cantidad Válida");
    }

}

// ******* FUNCION BORRAROUTPUT *****************
function borrarOutput() {

    document.querySelector(".ticketsOutput").textContent = "Total a pagar:"

    let form = document.querySelector(".ticketsForm");
    for (i = 0; i < 4; i++) {
        document.querySelector("." + form[i].className).style.border = "2px solid var(--gray-300)";
    }
}


// ******* FUNCION APDATECATEGORY *****************
function updateCategory(evento) {
    // console.log(document.querySelector(".ticketsCategory"));
    let categoria = evento.target.parentNode.className;

    switch (categoria) {
        case "estudiante": {
            console.log("es estudiante");
            document.querySelector(".ticketsCategory").options.selectedIndex = 0;
            document.querySelector(".estudiante").style.backgroundColor = "#f2f2f2";
            document.querySelector(".trainee").style.backgroundColor = "transparent";
            document.querySelector(".junior").style.backgroundColor = "transparent";
            break;
        }
        case "trainee": {
            console.log("es trainee");
            document.querySelector(".ticketsCategory").options.selectedIndex = 1;
            document.querySelector(".estudiante").style.backgroundColor = "transparent";
            document.querySelector(".trainee").style.backgroundColor = "#f2f2f2";
            document.querySelector(".junior").style.backgroundColor = "transparent";
            break;
        }
        case "junior": {
            console.log("es junior");
            document.querySelector(".ticketsCategory").options.selectedIndex = 2;
            document.querySelector(".estudiante").style.backgroundColor = "transparent";
            document.querySelector(".trainee").style.backgroundColor = "transparent";
            document.querySelector(".junior").style.backgroundColor = "#f2f2f2";
            break;
        }
    }
}


// ******* FUNCION CELARINPUT *****************
function ticketsSubmit() {

    let form = document.querySelector(".ticketsForm");

    inputCheck(form);

    function inputCheck(form) {
        let arrayCheck = [];
        for (i = 0; i < 3; i++) {
            arrayCheck[i] = form[i].value;
            if (form[i].value == "") {
                document.querySelector("." + form[i].className).style.border = "2px solid red";
            } else {
                document.querySelector("." + form[i].className).style.border = "1px solid var(--gray-300)";
            }
        }

        if (arrayCheck.every(element => element != "")) {
            if (form[2].value.includes('@') && form[2].value.includes('.')) {
                alert("Formulario enviado");
                form.submit();
                document.querySelector("." + form[2].className).style.border = "1px solid var(--gray-300)";
            } else {
                alert("Debe ingresar un correo válido");
                document.querySelector("." + form[2].className).style.border = "2px solid red"
            }
        } else {
            alert("Completar los campos en rojo");
        }

    }
}

// ******* FUNCION CLEARINPUT *****************
function clearInput(evento) {
    // console.log(evento.target.className);
    document.querySelector("." + evento.target.className).style.border = "1px solid var(--gray-300)";
}

// ******* FUNCION DESCUENTO *****************
function descuento(evento) {
    // console.log(typeof(evento.target.value));
    switch (evento.target.value) {
        case "Estudiante": {
            document.querySelector(".estudiante").style.backgroundColor = "#f2f2f2";
            document.querySelector(".trainee").style.backgroundColor = "transparent";
            document.querySelector(".junior").style.backgroundColor = "transparent";
            break;
        }
        case "Trainee": {
            document.querySelector(".estudiante").style.backgroundColor = "transparent";
            document.querySelector(".trainee").style.backgroundColor = "#f2f2f2";
            document.querySelector(".junior").style.backgroundColor = "transparent";
            break;
        }
        case "Junior": {
            document.querySelector(".estudiante").style.backgroundColor = "transparent";
            document.querySelector(".trainee").style.backgroundColor = "transparent";
            document.querySelector(".junior").style.backgroundColor = "#f2f2f2";
            break;
        }
    }
}