const htmlContent = `
<html>
<head>
  <style>
    body {
      background-color: #CBD5E1; /* Color de fondo celeste */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif; /* Cambiar la fuente a Arial */
    }

    .content {
      text-align: center;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      text-align: center;
      text-decoration: none;
      border: none;
      outline: none;
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 0;
    }

    .button:hover {
      background-color: #45a049; /* Color de fondo verde oscuro en hover */
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>Venta registrada exitosamente</h1>
    <p>La transacción se ha completado.</p>
    <button class="button" onclick="window.close()">Cerrar ventana</button>
  </div>
</body>
</html>
`;

module.exports = htmlContent;
