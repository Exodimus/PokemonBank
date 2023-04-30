// Obtiene los items del nav
const navItems = document.querySelectorAll('.nav-item');
const lblAct = document.querySelector('.lblAct');
const div = document.querySelector('.mb-3');
const btnLogin = document.querySelector('.btnLogin');
//const transacList = document.querySelector('.transacList');

//Añade alerta al boton si el btnLogin existe
if(btnLogin != null){
  btnLogin.onclick = function () {
    swal("Credenciales correctas", "", "success").then(() =>{
      window.location = "dashboard.html";
    }) ;
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
            div.innerHTML = `<label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Nota</label>
            <input type="text" min="1" class="form-control" id="formGroupExampleInput2">
            <label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Monto a depositar</label>
            <input type="number" min="1" class="form-control" id="formGroupExampleInput2">
            <button type="submit" class="btn btn-primary mt-3 bg-success">Enter</button>`;  
          break;
        case 'Retiro':
            div.innerHTML = `<label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Nota</label>
            <input type="text" min="1" class="form-control" id="formGroupExampleInput2">
            <label for="formGroupExampleInput2" required class="form-label fw-bold lblAct">Monto a retirar</label>
            <input type="number" min="1" class="form-control" id="formGroupExampleInput2">
            <button type="submit" class="btn btn-primary mt-3 bg-success">Enter</button>`;
          break;
        case 'Consultar saldo':
            div.innerHTML = `<h1 class="text-center">El saldo disponible es: $100</h1>`;            
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
        default:
          break;
      } 
  });
});

