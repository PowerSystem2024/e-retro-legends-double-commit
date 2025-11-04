export class PaymentModel {
  constructor(db) {
    this.db = db; // cliente pg, supabase, o neon
  }

  async createOrUpdate(payment) {
    const query = `
          INSERT INTO payments (payment_id, order_id, user_id, status, amount, currency, payment_method, payer_email)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (payment_id)
          DO UPDATE SET
          status = EXCLUDED.status,
          updated_at = NOW();
        `;

    const values = [
      payment.id,
      payment.order_id || null,
      payment.user_id || null,
      payment.status,
      payment.transaction_amount,
      payment.currency_id,
      payment.payment_method_id,
      payment.payer?.email || null,
    ];

    await this.db.query(query, values);
  }
}
