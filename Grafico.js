var ctx = document.getElementById("resultadosChart").getContext("2d");

var gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
gradientFill.addColorStop(0, "rgba(0, 106, 255, 0.5)"); // Azul más suave en la parte superior
gradientFill.addColorStop(1, "rgba(0, 106, 255, 0.1)"); // Azul claro en la parte inferior

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Año 0", "Año 1", "Año 2", "Año 3", "Año 4", "Año 5"],
    datasets: [
      {
        label: "Valorización en UF",
        data: [
          2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000,
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
