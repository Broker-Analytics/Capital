document.addEventListener("DOMContentLoaded", function () {
  const valorUFInput = document.getElementById("valorUF");
  const valorUnidadInput = document.getElementById("valorUnidad");
  const upFrontInput = document.getElementById("upFront");
  const pieAntesInput = document.getElementById("pieAntes");
  const pieAntesCuotasInput = document.getElementById("pieAntesCuotas");
  const pieDespuesInput = document.getElementById("pieDespues");
  const pieDespuesCuotasInput = document.getElementById("pieDespuesCuotas");
  const cuotonInput = document.getElementById("cuoton");

  const upFrontCLPInput = document.getElementById("upFrontCLP");
  const cuotasAntesCLPInput = document.getElementById("cuotasAntesCLP");
  const cuotasDespuesCLPInput = document.getElementById("cuotasDespuesCLP");
  const cuotonCLPInput = document.getElementById("cuotonCLP");

  // Función para formatear los números en CLP con separadores de miles
  function formatCLP(value) {
    return "$" + value.toLocaleString("es-CL", { minimumFractionDigits: 0 });
  }

  function calcularCuotas() {
    const valorUF = parseFloat(valorUFInput.value) || 0;
    const valorUnidad = parseFloat(valorUnidadInput.value) || 0;
    const upFront = parseFloat(upFrontInput.value) || 0;
    const pieAntes = parseFloat(pieAntesInput.value) || 0;
    const pieAntesCuotas = parseInt(pieAntesCuotasInput.value) || 1;
    const pieDespues = parseFloat(pieDespuesInput.value) || 0;
    const pieDespuesCuotas = parseInt(pieDespuesCuotasInput.value) || 1;
    const cuoton = parseFloat(cuotonInput.value) || 0;

    // Calcular los valores en CLP
    const valorUnidadCLP = valorUnidad * valorUF;
    const upFrontCLP = (upFront / 100) * valorUnidadCLP;
    const cuotasAntesCLP = ((pieAntes / 100) * valorUnidadCLP) / pieAntesCuotas;
    const cuotasDespuesCLP =
      ((pieDespues / 100) * valorUnidadCLP) / pieDespuesCuotas;
    const cuotonCLP = (cuoton / 100) * valorUnidadCLP;

    // Reflejar los resultados formateados en los campos correspondientes
    upFrontCLPInput.value = formatCLP(upFrontCLP);
    cuotasAntesCLPInput.value = formatCLP(cuotasAntesCLP);
    cuotasDespuesCLPInput.value = formatCLP(cuotasDespuesCLP);
    cuotonCLPInput.value = formatCLP(cuotonCLP);
  }

  // Escuchar los eventos de entrada para recalcular las cuotas
  valorUFInput.addEventListener("input", calcularCuotas);
  valorUnidadInput.addEventListener("input", calcularCuotas);
  upFrontInput.addEventListener("input", calcularCuotas);
  pieAntesInput.addEventListener("input", calcularCuotas);
  pieAntesCuotasInput.addEventListener("input", calcularCuotas);
  pieDespuesInput.addEventListener("input", calcularCuotas);
  pieDespuesCuotasInput.addEventListener("input", calcularCuotas);
  cuotonInput.addEventListener("input", calcularCuotas);
});
