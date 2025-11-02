// controllers/payment.controller.js
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export class PaymentController {
  createPreferenceMP = async (req, res) => {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Faltan items válidos en la solicitud" });
      }

      const body = {
        items: items.map((item) => ({
          title: item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "ARS",
        })),
        back_urls: {
          success: "https://calcagni-gabriel-dev.vercel.app/success",
          failure: "https://calcagni-gabriel-dev.vercel.app/failure",
          pending: "https://calcagni-gabriel-dev.vercel.app/pending",
        },
        auto_return: "approved",
        notification_url: "https://your-server.com/webhook", // Url para notificaciones de pago
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });

      return res.status(200).json({
        id: result.id,
        init_point: result.init_point, // URL donde redirige el cliente
      });
    } catch (error) {
      console.error("Error en Mercado Pago:", error);
      return res.status(500).json({ error: "Error al crear la preferencia de pago" });
    }
  };

  webhook = async (req, res) => {
    try {
      const { type, data } = req.body;

      if (type === "payment" && data && data.id) {
        const payment = new Payment(client);
        const paymentInfo = await payment.get({ id: data.id });

        console.log("📩 Webhook recibido:", paymentInfo);

        // Aquí vamos a guardar o actualizar el estado del pago en la base de datos:
        // await PaymentModel.updateStatus(paymentInfo);

        return res.status(200).send("OK");
      }

      return res.status(200).send("Evento no procesado");
    } catch (error) {
      console.error("Error en webhook:", error);
      return res.status(500).send("Error al procesar webhook");
    }
  };
}
