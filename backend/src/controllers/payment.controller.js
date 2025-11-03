import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

export class PaymentController {
  constructor({ paymentDb }) {
    this.paymentDb = paymentDb;

    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
  }

  // Crear preferencia para el (checkout)
  createPreferenceMP = async (req, res) => {
    try {
      const { items } = req.body;

      if (!items?.length) {
        return res.status(400).json({ error: "No se enviaron productos válidos" });
      }

      const preference = new Preference(this.client);
      const result = await preference.create({
        body: {
          items: items.map((i) => ({
            title: i.title,
            quantity: Number(i.quantity),
            unit_price: Number(i.price),
            currency_id: "ARS",
          })),
          back_urls: {
            success: "https://calcagni-gabriel-dev.vercel.app/success",
            failure: "https://calcagni-gabriel-dev.vercel.app/failure",
            pending: "https://calcagni-gabriel-dev.vercel.app/pending",
          },
          notification_url: "https://tu-api.com/api/payments/webhook",
          auto_return: "approved",
        },
      });

      res.status(200).json({ id: result.id, init_point: result.init_point });
    } catch (error) {
      console.error("Error al crear preferencia:", error);
      res.status(500).json({ error: "No se pudo crear la preferencia" });
    }
  };

  // Webhook (recibir notificaciones de MP)
  webhook = async (req, res) => {
    try {
      const { type, data } = req.body;

      if (type === "payment" && data?.id) {
        const payment = new Payment(this.client);
        const paymentInfo = await payment.get({ id: data.id });

        // Guardar o actualizar en DB (esta dependencia se inyecta desde payment.routes.js)
        await this.paymentDb.createOrUpdate(paymentInfo);

        console.log("Pago actualizado:", paymentInfo.status);
        return res.status(200).send("OK");
      }

      return res.status(200).send("Evento ignorado");
    } catch (error) {
      console.error("Error en webhook:", error);
      res.status(500).send("Error procesando webhook");
    }
  };
}
