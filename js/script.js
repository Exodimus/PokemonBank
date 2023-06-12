// Obtiene los items del nav
const navItems = document.querySelectorAll('.nav-item');
const lblAct = document.querySelector('.lblAct');
const div = document.querySelector('.dashboard');
const formLogin = document.querySelector('.login');
const pin = document.querySelector('#pin');
const btnTransac = document.querySelector('#enviar');
const transacList = document.querySelector('.transacList')

let saldo = localStorage.getItem("saldo") || 500;
let historial = JSON.parse(localStorage.getItem("historial")) || [];

//Valida el login
if (formLogin != null) {
  formLogin.onsubmit = function (e) {
    e.preventDefault();
    valor = pin.value;
    if(valor == null || valor.length == 0)
      swal("Ingresa tu pin", "", "error")
    else{
      if(isNaN(valor))
        swal("Tu pin es númerico", "", "error")

        else{
        if(valor == "1234"){
          swal("Pin correcto", "", "success").then(() =>{
            window.location = "dashboard.html";
          })
        } else
          swal("Pin incorrecto", "", "error")
      }
    }
  }
}

// Recorre todos los items
navItems.forEach(navItem => {
  navItem.addEventListener('click', () => {
    //Quita la clase active
    navItems.forEach(item => item.querySelector('.nav-link').classList.remove('active'));
    // Si existe la clase active la quita, si no la agrega
    navItem.querySelector('.nav-link').classList.toggle('active');

    // Verifica el elemento seleccionado
    switch (navItem.querySelector('.nav-link').textContent) {
        case 'Depósito':
          console.log(btnTransac);
          btnTransac.classList.add("depositar")
            div.innerHTML = `<label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Nota</label>
            <input type="text" min="1" class="form-control" id="nota">
            <label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Monto a depositar</label>
            <input type="number" min="1" class="form-control" id="monto">
            <button type="submit" id="enviar" onclick="transactControl()" class="btn btn-primary  mt-3 bg-success">Enter</button>`;  
          break;
        case 'Retiro':
          btnTransac.classList.remove("depositar")
            div.innerHTML = `<label for="nota" required class="form-label fw-bold lblAct">Nota</label>
            <input type="text" min="1" class="form-control" id="nota">
            <label for="monto" required class="form-label fw-bold lblAct">Monto a retirar</label>
            <input type="number" min="1" class="form-control" id="monto">
            <button type="submit" id="enviar" onclick="transactControl()"  class="btn btn-primary retirar mt-3 bg-success">Enter</button>`;
          break;
        case 'Consultar saldo':
            div.innerHTML = `<h1 class="text-center">El saldo disponible es: $${localStorage.getItem("saldo")}</h1>`;            
          break;
        case 'Pago de servicios':
            div.innerHTML = `<ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Energía eléctrica
              <span class="badge bg-primary rounded-pill p-2 pagar">Pagar</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Agua potable
              <span class="badge bg-primary rounded-pill p-2 pagar">Pagar</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Internet
              <span class="badge bg-primary rounded-pill p-2 pagar">Pagar</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Telefonía
              <span class="badge bg-primary rounded-pill p-2 pagar">Pagar</span>
            </li>
          </ul>`;
          break;

      } 
  });
});
  /**
   * 
   *    ;
   */

  function transactControl() {
    let monto = parseInt(document.querySelector("#monto").value);
    let nota = document.querySelector("#nota").value;
    if (monto != '' && nota != '') {
      if (btnTransac.classList.contains("depositar")) {
        saldo += monto;
        historial.push({ tipo: "deposito", monto: monto, nota: nota });
        //Guarda los datos en local storage
        localStorage.setItem("saldo", saldo);
        localStorage.setItem("historial", JSON.stringify(historial));
        //Limpia los campos
        document.getElementById("monto").value = "";
        document.getElementById("nota").value = "";
      } else {
        if (monto <= saldo) {
          saldo -= monto;
          historial.push({ tipo: "retiro", monto: monto, nota: nota });
          //guarda los datos en local storage
          localStorage.setItem("saldo", saldo);
          localStorage.setItem("historial", JSON.stringify(historial));
          //Limpia los campos
          document.getElementById("monto").value = "";
          document.getElementById("nota").value = "";
        } else {
          console.log("Saldo insuficiente");
        }
      }
    } else {
      console.log("No se permiten campos vacíos");
    }
  }
  


//Función que limpia los campos
function limpiarCampos() {
  document.getElementById("monto").value = "";
  document.getElementById("nota").value = "";
}

window.addEventListener("load", function() {
  if (window.location.href.includes("transacciones.html")) {
    actualizarHistorial();
    crearGrafica()
  }
});

  //Actualiza el historial de transacciones dinámicamente
  function actualizarHistorial() {
    if(transacList != null){
      transacList.innerHTML = "";
      historial.forEach(function(transaccion) {
        var li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex" ,"justify-content-between" ,"align-items-center")
        if (transaccion.tipo == "deposito")
          li.innerHTML = `${transaccion.nota} <span class="badge bg-danger rounded-pill p-2">+$${transaccion.monto}</span>`
          else
          li.innerHTML = `${transaccion.nota} <span class="badge bg-primary rounded-pill p-2">-$${transaccion.monto}</span>`
        transacList.appendChild(li);
      });
    }
}

function obtenerCantidadDepositos() {
  const historialLocalStorage = JSON.parse(localStorage.getItem('historial')) || [];
  return historialLocalStorage.reduce(function (contador, transaccion) {
    if (transaccion.tipo === 'deposito') {
      return contador + 1;
    } else {
      return contador;
    }
  }, 0);
}

function obtenerCantidadRetiros() {
  const historialLocalStorage = JSON.parse(localStorage.getItem('historial')) || [];
  return historialLocalStorage.reduce(function (contador, transaccion) {
    if (transaccion.tipo === 'retiro') {
      return contador + 1;
    } else {
      return contador;
    }
  }, 0);
}

function crearGrafica(){
    //Configuración para gráfica de pastel
    var datos = {
      labels: ["Retiros", "Depositos"],
      datasets: [
        {
          data: [obtenerCantidadRetiros() ,obtenerCantidadDepositos()],
          backgroundColor: ["#0D6EFD", "#DC3545"],
          hoverBackgroundColor: ["#0D47A1", "#C62828"]      
        }
      ]
    };

    var opciones = {
      responsive: true,
      maintainAspectRatio: false
    };

    var grafica = new Chart(document.getElementById("acquisitions"), {
      type: 'pie',
      data: datos,
      options: opciones
    });
}


