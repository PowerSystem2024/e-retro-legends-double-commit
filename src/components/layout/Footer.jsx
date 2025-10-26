import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t-4 border-gray-400 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Acerca */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">Acerca de e-Retro Legends</h3>
            <ul className="text-xs space-y-2">
              <li><Link to="/about" className="text-blue-600 hover:underline">Quiénes somos</Link></li>
              <li><Link to="/careers" className="text-blue-600 hover:underline">Trabaja con nosotros</Link></li>
              <li><Link to="/press" className="text-blue-600 hover:underline">Prensa</Link></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">Ayuda y Contacto</h3>
            <ul className="text-xs space-y-2">
              <li><Link to="/help" className="text-blue-600 hover:underline">Centro de ayuda</Link></li>
              <li><Link to="/contact" className="text-blue-600 hover:underline">Contáctanos</Link></li>
              <li><Link to="/shipping" className="text-blue-600 hover:underline">Información de envío</Link></li>
              <li><Link to="/returns" className="text-blue-600 hover:underline">Devoluciones</Link></li>
            </ul>
          </div>

          {/* Vendedor */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">Vender</h3>
            <ul className="text-xs space-y-2">
              <li><Link to="/seller/start" className="text-blue-600 hover:underline">Empieza a vender</Link></li>
              <li><Link to="/seller/fees" className="text-blue-600 hover:underline">Tarifas de venta</Link></li>
              <li><Link to="/seller/resources" className="text-blue-600 hover:underline">Recursos para vendedores</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-blue-900">Legal</h3>
            <ul className="text-xs space-y-2">
              <li><Link to="/privacy" className="text-blue-600 hover:underline">Política de privacidad</Link></li>
              <li><Link to="/terms" className="text-blue-600 hover:underline">Términos de uso</Link></li>
              <li><Link to="/cookies" className="text-blue-600 hover:underline">Política de cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-400 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-600">
            © 1999-2025 e-Retro Legends Inc. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Diseñado con nostalgia por doubleCommit-2024 🏆
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

