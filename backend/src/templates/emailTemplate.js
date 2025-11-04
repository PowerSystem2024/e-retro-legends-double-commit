export const emailTemplate = ({ userName, url }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido a e-Retro-Legends</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Inter", "Segoe UI", Arial, sans-serif;
        background-color: #f5f5f0;
        color: #2c2c2c;
        -webkit-text-size-adjust: none;
      }
      table {
        border-spacing: 0;
        width: 100%;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        border: 2px solid #d4af37;
      }
      .header {
        background: linear-gradient(135deg, #1a472a, #2d5f3f);
        color: #ffffff;
        text-align: center;
        padding: 40px 20px;
        position: relative;
      }
      .header::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          );
        pointer-events: none;
      }
      .header h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #d4af37;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        position: relative;
        z-index: 1;
      }
      .header p {
        margin: 8px 0 0 0;
        font-size: 14px;
        color: #e8e8e8;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-weight: 500;
      }
      .content {
        padding: 40px 35px;
        text-align: center;
      }
      .content h2 {
        font-size: 24px;
        color: #1a472a;
        margin-bottom: 16px;
        font-weight: 700;
      }
      .content p {
        font-size: 15px;
        color: #4a4a4a;
        line-height: 1.7;
        margin: 12px 0;
      }
      .sports-icons {
        margin: 25px 0;
        font-size: 28px;
        letter-spacing: 15px;
      }
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #d4af37, #f4d03f);
        color: #1a472a !important;
        text-decoration: none;
        padding: 15px 36px;
        border-radius: 8px;
        font-weight: 700;
        margin-top: 24px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        border: 2px solid #d4af37;
      }
      .button:hover {
        background: linear-gradient(135deg, #b8941f, #d4af37);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        transform: translateY(-2px);
      }
      .divider {
        width: 70%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        margin: 35px auto;
      }
      .footer {
        background: #2c2c2c;
        text-align: center;
        font-size: 13px;
        color: #b8b8b8;
        padding: 20px 15px;
        border-top: 2px solid #d4af37;
      }
      .highlight {
        color: #d4af37;
        font-weight: 700;
      }
      .vintage-badge {
        display: inline-block;
        background: #1a472a;
        color: #d4af37;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-top: 8px;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: #1a1a1a;
        }
        .container {
          background: #2a2a2a;
          border: 2px solid #d4af37;
        }
        .content h2 {
          color: #d4af37;
        }
        .content p {
          color: #c0c0c0;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation">
      <tr>
        <td align="center">
          <div class="container">
            <div class="header">
              <h1>⚡ e-Retro-Legends ⚡</h1>
              <p>Authentic Vintage Sportswear</p>
            </div>
            <div class="content">
              <h2>¡Bienvenido, ${userName}! 🏆</h2>
              <p>
                Nos emociona tenerte en <span class="highlight">e-Retro-Legends</span>, 
                tu tienda especializada en indumentaria deportiva vintage auténtica.
              </p>
              <div class="sports-icons">⚽ 🏀 🎾 🥊</div>
              <p>
                Descubre camisetas legendarias de fútbol, basketball, tenis, boxeo 
                y muchos deportes más. Cada prenda cuenta la historia de grandes 
                momentos y atletas que marcaron épocas.
              </p>
              <p>
                Desde clásicos del 70 hasta íconos de los 90, tenemos las piezas 
                que todo coleccionista busca.
              </p>
              <span class="vintage-badge">Colección Vintage Certificada</span>
              <a href="${url}" class="button">Ver Colección</a>
              <div class="divider"></div>
              <p style="font-size: 13px; color: #808080">
                Si no creaste esta cuenta, puedes ignorar este correo.
              </p>
            </div>
            <div class="footer">
              © 2025 e-Retro-Legends by doubleCommit<br />
              Creado con 💜 para los amantes del deporte vintage.
            </div>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
