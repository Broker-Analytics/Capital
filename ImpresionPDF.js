document.addEventListener("DOMContentLoaded", function () {
  const generateQuoteBtn = document.getElementById("generate-quote-btn");

  // Verificar si el botón existe en el DOM
  if (!generateQuoteBtn) {
    console.error("No se encontró el botón con el id 'generate-quote-btn'.");
    return;
  }

  generateQuoteBtn.addEventListener("click", function () {
    // Seleccionamos el área que queremos capturar en PDF
    const element = document.querySelector(".container");

    if (!element) {
      console.error("El contenedor '.container' no se encontró.");
      return;
    }

    // Ajuste de margen temporalmente para mejorar la captura
    const preciosCuotas = document.querySelector(".precios-cuotas-clp");
    const financiamiento = document.querySelector(".financiamiento");

    if (preciosCuotas && financiamiento) {
      preciosCuotas.style.marginTop = "50px";
      financiamiento.style.marginBottom = "50px";
    }

    // Configuración del PDF
    const options = {
      margin: 0,
      filename: "cotizacion.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
      },
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all"] },
    };

    // Generar el PDF
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => {
        // Restaurar los márgenes a sus valores originales después de guardar el PDF
        if (preciosCuotas && financiamiento) {
          preciosCuotas.style.marginTop = "";
          financiamiento.style.marginBottom = "";
        }
      })
      .catch((error) => {
        console.error("Error al generar el PDF:", error);
      });
  });
});
