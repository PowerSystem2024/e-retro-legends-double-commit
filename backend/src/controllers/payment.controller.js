import { MercadoPagoConfig, Preference } from "mercadopago";

export class PaymentController {
  constructor() {}

  createPreferenceMP = async (req, res) => {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    try {
      const body = {
        items: [
          {
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://calcagni-gabriel-dev.vercel.app/api/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });
      return res.json({ id: result.id, result });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
