let chart; // Variable global para almacenar el gráfico

function calcularCredito() {
  // Obtener los valores ingresados
  const valorUF = parseFloat(document.getElementById("valorUF").value);
  const financiamiento =
    parseFloat(document.getElementById("financiamiento").value) / 100;
  const valorActualUF = parseFloat(
    document.getElementById("valorActualUF").value
  );
  const numCuotas = parseInt(document.getElementById("numCuotas").value);
  const tasaInteresAnual =
    parseFloat(document.getElementById("tasaInteres").value) / 100;
  const seguroDesgravamen =
    parseFloat(document.getElementById("seguroDesgravamen").value) / 100;
  const seguroIncendio =
    parseFloat(document.getElementById("seguroIncendio").value) / 100;
  const tasaPlusvalia =
    parseFloat(document.getElementById("plusvalia").value) / 100;

  // 1. Valor del Crédito Hipotecario
  const valorCredito = valorUF * financiamiento;

  // 2. Conversión de Tasa de Interés Anual a Mensual (usando tasa efectiva)
  const tasaInteresMensual = Math.pow(1 + tasaInteresAnual, 1 / 12) - 1;

  // 3. Cálculo del Dividendo Mensual sin Seguros (fórmula de anualidades)
  const dividendoSinSeguros =
    (valorCredito * tasaInteresMensual) /
    (1 - Math.pow(1 + tasaInteresMensual, -numCuotas));

  // 4. Seguros Mensuales (Desgravamen e Incendio)
  const segurosMensuales =
    (valorUF * (seguroDesgravamen + seguroIncendio)) / 12;

  // 5. Dividendo Mensual con Seguros
  const dividendoConSeguros = dividendoSinSeguros + segurosMensuales;

  // 6. Calcular Saldo del Crédito después de 5 años
  let saldoCredito = valorCredito;
  for (let i = 0; i < 60; i++) {
    const interesMensual = saldoCredito * tasaInteresMensual;
    const amortizacionMensual = dividendoSinSeguros - interesMensual;
    saldoCredito -= amortizacionMensual;
  }

  // 7. Valorización de la propiedad después de 5 años (Plusvalía)
  const valorizacionUF = valorUF * Math.pow(1 + tasaPlusvalia, 5);

  // 8. Valorización en CLP
  const valorizacionCLP = valorizacionUF * valorActualUF;

  // 9. Ganancia Potencial
  const ganancia = valorizacionUF - saldoCredito;
  const gananciaCLP = ganancia * valorActualUF;

  // Función para formatear números con separadores de miles
  function formatearCLP(valor) {
    return valor.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Actualizar la interfaz de usuario
  document.getElementById("valorCreditoCLP").textContent =
    valorCredito.toFixed(2);
  document.getElementById("dividendoSinSeguros").textContent =
    dividendoSinSeguros.toFixed(2);
  document.getElementById("dividendoConSeguros").textContent =
    dividendoConSeguros.toFixed(2);
  document.getElementById("saldoCH").textContent = saldoCredito.toFixed(2);
  document.getElementById("valorizacionUF").textContent =
    valorizacionUF.toFixed(2);
  document.getElementById("valorizacionCLP").textContent =
    formatearCLP(valorizacionCLP);
  document.getElementById("ganancia").textContent = ganancia.toFixed(2);
  document.getElementById("gananciaCLP").textContent =
    formatearCLP(gananciaCLP);

  // Crear o actualizar el gráfico dinámicamente
  var ctx = document.getElementById("resultadosChart").getContext("2d");
  var gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, "rgba(0, 106, 255, 0.5)"); // Azul más suave en la parte superior
  gradientFill.addColorStop(1, "rgba(0, 106, 255, 0.1)"); // Azul claro en la parte inferior

  // Destruir gráfico existente si ya fue creado
  if (chart) {
    chart.destroy();
  }

  // Crear el nuevo gráfico con los datos actualizados
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Año 0", "Año 1", "Año 2", "Año 3", "Año 4", "Año 5"],
      datasets: [
        {
          label: "Valorización en UF",
          data: [
            valorUF.toFixed(2),
            (valorUF * Math.pow(1 + tasaPlusvalia, 1)).toFixed(2),
            (valorUF * Math.pow(1 + tasaPlusvalia, 2)).toFixed(2),
            (valorUF * Math.pow(1 + tasaPlusvalia, 3)).toFixed(2),
            (valorUF * Math.pow(1 + tasaPlusvalia, 4)).toFixed(2),
            valorizacionUF.toFixed(2),
          ],
          backgroundColor: gradientFill, // Relleno degradado
          borderColor: "#006aff", // Color de la línea más brillante
          borderWidth: 3, // Grosor de la línea
          fill: true, // Activar el relleno bajo la línea
          tension: 0.3, // Suavizar la curva de la línea
          pointRadius: 4, // Tamaño de los puntos en la línea
          pointBackgroundColor: "#ffffff", // Color de fondo de los puntos
          pointBorderColor: "#006aff", // Borde de los puntos
          pointHoverRadius: 6, // Efecto hover en los puntos
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#ffffff", // Color de los números del eje Y
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Líneas del grid más suaves
          },
        },
        x: {
          ticks: {
            color: "#ffffff", // Color de las etiquetas en el eje X
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Líneas del grid en el eje X
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#ffffff", // Color de la leyenda
          },
        },
        tooltip: {
          backgroundColor: "#2a2e38", // Fondo oscuro para el tooltip
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
        },
      },
    },
  });
}

// Función para calcular el Cap Rate
function calcularCapRate() {
  // Obtener los valores ingresados en los inputs
  const noi = parseFloat(document.getElementById("noi").value);
  const mantenimiento = parseFloat(document.getElementById("mantencion").value);
  const valorPropiedad = parseFloat(
    document.getElementById("valorPropiedad").value
  );

  // Verificar si los valores son válidos
  if (
    isNaN(noi) ||
    isNaN(mantenimiento) ||
    isNaN(valorPropiedad) ||
    valorPropiedad === 0
  ) {
    alert(
      "Por favor, ingresa valores válidos para el NOI, los costos de mantenimiento y el valor de la propiedad."
    );
    return;
  }

  // Cálculo del Cap Rate
  const capRate = ((noi - mantenimiento) / valorPropiedad) * 100;

  // Mostrar el resultado en el elemento de resultado
  document.getElementById("capRateResultado").textContent =
    "Cap Rate: " + capRate.toFixed(2) + "%";
}
