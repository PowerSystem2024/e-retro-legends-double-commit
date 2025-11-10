import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useProducts } from '../../contexts/ProductContext';

const ProductManagement = () => {
  // Datos de ejemplo - en producción vendrían del backend
  const { deleteProduct, products } = useProducts()
  const [filter, setFilter] = useState('');
 
  const handleDelete = async (productId) => {
    await deleteProduct(productId)
  };

  const filteredProducts = products?.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'active') return product.status === 'Activo';
    if (filter === 'inactive') return product.status === 'Inactivo';
    if (filter === 'out-of-stock') return product.stock === 0;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Gestión de Productos</h1>
            <p className="text-gray-600">Administra tu inventario</p>
          </div>
          <Link to="/seller/products/new">
            <Button variant="success" size="large">
              + Nuevo Producto
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-gray-400 p-4 mb-6">
          <div className="flex gap-3">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="small"
              onClick={() => setFilter('all')}
            >
              Todos ({products?.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'primary' : 'outline'}
              size="small"
              onClick={() => setFilter('active')}
            >
              Activos ({products?.filter(p => p.status === 'Activo').length})
            </Button>
            <Button
              variant={filter === 'inactive' ? 'primary' : 'outline'}
              size="small"
              onClick={() => setFilter('inactive')}
            >
              Inactivos ({products?.filter(p => p.status === 'Inactivo').length})
            </Button>
            <Button
              variant={filter === 'out-of-stock' ? 'primary' : 'outline'}
              size="small"
              onClick={() => setFilter('out-of-stock')}
            >
              Sin Stock ({products?.filter(p => p.stock === 0).length})
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border-2 border-gray-400">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="text-left p-4 font-bold">Producto</th>
                  <th className="text-left p-4 font-bold">Categoría</th>
                  <th className="text-left p-4 font-bold">Precio</th>
                  <th className="text-left p-4 font-bold">Stock</th>
                  <th className="text-left p-4 font-bold">Estado</th>
                  <th className="text-left p-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map((product) => (
                  <tr key={product.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📦</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">{product.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-green-700">${product.price}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 border-2 text-xs font-bold ${
                        product.status === 'Activo' ? 'bg-green-100 border-green-400 text-green-800' :
                        product.status === 'Sin Stock' ? 'bg-red-100 border-red-400 text-red-800' :
                        'bg-gray-100 border-gray-400 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link to={`/seller/products/edit/${product.id}`}>
                          <Button variant="primary" size="small">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleDelete(product.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts?.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📦</div>
              <p className="text-gray-600">No se encontraron productos con este filtro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

