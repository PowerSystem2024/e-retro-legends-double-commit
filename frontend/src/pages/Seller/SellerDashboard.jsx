import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
import { formatDate } from '../../utils/formatDate';

const SellerDashboard = () => {
  const { user } = useAuth()
  const { orders: recentOrders } = useOrder()
  // Datos de ejemplo
  const stats = {
    totalSales: 5420.50,
    pendingOrders: 8,
    activeListings: 24,
    totalProducts: 32
  };
  console.log(recentOrders)
  // const recentOrders = [
  //   { id: 1, orderNumber: '789456', buyer: 'Juan Pérez', total: 149.99, status: 'Pendiente', date: '2025-10-17' },
  //   { id: 2, orderNumber: '654321', buyer: 'María García', total: 89.99, status: 'Procesando', date: '2025-10-16' },
  //   { id: 3, orderNumber: '456789', buyer: 'Carlos López', total: 199.99, status: 'Enviado', date: '2025-10-15' }
  // ];

  const topProducts = [
    { id: 1, name: 'Camiseta Retro Brasil 1970', sales: 45, revenue: 4049.55 },
    { id: 2, name: 'Jersey Chicago Bulls 1996', sales: 32, revenue: 4799.68 },
    { id: 3, name: 'Raqueta Wilson Pro Staff 85', sales: 18, revenue: 3599.82 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Panel del Vendedor</h1>
            <p className="text-gray-600">Bienvenido de vuelta, {user?.name || ""}</p>
          </div>
          <Link to="/seller/products/new">
            <Button variant="success" size="large">
              + Nuevo Producto
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white border-2 border-green-700 p-6">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm opacity-90">Ventas Totales</p>
            <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-700 p-6">
            <div className="text-3xl mb-2">📦</div>
            <p className="text-sm opacity-90">Pedidos Pendientes</p>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-2 border-purple-700 p-6">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm opacity-90">Listados Activos</p>
            <p className="text-3xl font-bold">{stats.activeListings}</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-2 border-orange-700 p-6">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm opacity-90">Total Productos</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white border-2 border-gray-400">
            <div className="bg-blue-900 text-white p-4 border-b-2 border-gray-400">
              <h2 className="text-xl font-bold">Pedidos Recientes</h2>
            </div>
            <div className="p-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b-2 border-gray-200 py-3 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-blue-600">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 border-2 font-bold ${
                      order.status === 'Pendiente' ? 'bg-yellow-100 border-yellow-400 text-yellow-800' :
                      order.status === 'Procesando' ? 'bg-blue-100 border-blue-400 text-blue-800' :
                      'bg-green-100 border-green-400 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                    <Button variant="primary" size="small">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link to="/seller/orders" className="text-blue-600 hover:underline font-bold text-sm">
                  Ver Todos los Pedidos →
                </Link>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border-2 border-gray-400">
            <div className="bg-blue-900 text-white p-4 border-b-2 border-gray-400">
              <h2 className="text-xl font-bold">Productos Más Vendidos</h2>
            </div>
            <div className="p-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="border-b-2 border-gray-200 py-3 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.sales} ventas</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700">${product.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link to="/seller/products" className="text-blue-600 hover:underline font-bold text-sm">
                  Ver Todos los Productos →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white border-2 border-gray-400 p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/seller/products/new" className="border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 p-6 text-center transition-all duration-200 hover:border-blue-600">
              <div className="text-4xl mb-2">➕</div>
              <p className="font-bold text-sm">Añadir Producto</p>
            </Link>
            
            <Link to="/seller/orders" className="border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 p-6 text-center transition-all duration-200 hover:border-blue-600">
              <div className="text-4xl mb-2">📦</div>
              <p className="font-bold text-sm">Gestionar Pedidos</p>
            </Link>
            
            <Link to="/seller/products" className="border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 p-6 text-center transition-all duration-200 hover:border-blue-600">
              <div className="text-4xl mb-2">📋</div>
              <p className="font-bold text-sm">Mis Productos</p>
            </Link>
            
            <Link to="/seller/analytics" className="border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 p-6 text-center transition-all duration-200 hover:border-blue-600">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-bold text-sm">Analíticas</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

