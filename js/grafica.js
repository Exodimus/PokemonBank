//Configuración para gráfica de pastel
var datos = {
    labels: ["Depositos", "Retiros"],
    datasets: [
      {
        data: [1, 4],
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
  