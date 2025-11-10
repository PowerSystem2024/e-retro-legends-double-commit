import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useOrder } from '../../contexts/OrderContext';

export const OrderConfirmation = () => {
  const orderId = useParams()
  const { getOrderById } = useOrder()
  const order = getOrderById(orderId)

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border-2 border-gray-400 p-8 text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-4">✅</div>
          
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-gray-700 mb-6">
            Gracias por tu compra en e-Retro Legends
          </p>

          {/* Order Details */}
          <div className="bg-blue-50 border-2 border-blue-300 p-6 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Número de Pedido</p>
                <p className="text-xl font-bold text-blue-900">#{order.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pagado</p>
                <p className="text-xl font-bold text-green-700">${order.total}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 mb-6 text-left">
            <h3 className="font-bold text-lg mb-3">📦 Próximos Pasos</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Recibirás un email de confirmación en breve</li>
              <li>✓ El vendedor procesará tu pedido en 1-2 días hábiles</li>
              <li>✓ Te notificaremos cuando tu pedido sea enviado</li>
              <li>✓ Tiempo estimado de entrega: 5-7 días hábiles</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/buyer/orders" className="flex-1">
              <Button variant="primary" size="large" className="w-full">
                Ver Mis Pedidos
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" size="large" className="w-full">
                Seguir Comprando
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t-2 border-gray-300">
            <p className="text-sm text-gray-600">
              ¿Necesitas ayuda? <Link to="/contact" className="text-blue-600 hover:underline font-bold">Contáctanos</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

