import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useScrollToHash from '../../components/common/ScrollAuto';

export function LegalPage() {
    useScrollToHash(1000);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(() => {
        const h = (location.hash || '').replace('#', '').toLowerCase();
        return ['privacy', 'terms', 'cookies'].includes(h) ? h : 'privacy';
    });

    useEffect(() => {
        const h = (location.hash || '').replace('#', '').toLowerCase();
        if (!h) return;
        if (['privacy', 'terms', 'cookies'].includes(h)) {
        setActiveTab(h);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Centro Legal</h1>
            <p className="text-lg opacity-90">
                Políticas, términos y condiciones de e-Retro Legends
            </p>
            </div>
        </section>

        {/* Tabs Navigation */}
        <section className="bg-white border-b-4 border-gray-300 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto">
                <button
                onClick={() => {
                    setActiveTab('privacy');
                    window.history.replaceState(null, '', `${location.pathname}#privacy`);
                }}
                className={`py-4 px-4 font-bold border-b-4 transition whitespace-nowrap ${
                    activeTab === 'privacy'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
                >
                🔒 Política de Privacidad
                </button>
                <button
                onClick={() => {
                    setActiveTab('terms');
                    window.history.replaceState(null, '', `${location.pathname}#terms`);
                }}
                className={`py-4 px-4 font-bold border-b-4 transition whitespace-nowrap ${
                    activeTab === 'terms'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
                >
                📋 Términos de Uso
                </button>
                <button
                onClick={() => {
                    setActiveTab('cookies');
                    window.history.replaceState(null, '', `${location.pathname}#cookies`);
                }}
                className={`py-4 px-4 font-bold border-b-4 transition whitespace-nowrap ${
                    activeTab === 'cookies'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
                >
                🍪 Política de Cookies
                </button>
            </div>
            </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* POLÍTICA DE PRIVACIDAD */}
            {activeTab === 'privacy' && (
            <div id="privacy" className="space-y-8">
                <div className="bg-white border-2 border-gray-400 p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">🔒 Política de Privacidad</h2>
                <p className="text-gray-600 mb-4">Última actualización: Noviembre 2025</p>

                <div className="space-y-8">
                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Introducción</h3>
                    <p className="text-gray-700 mb-4">
                        En e-Retro Legends Inc. ("nosotros", "nuestro" o "la Empresa"), protegemos tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando visitas nuestro sitio web.
                    </p>
                    <p className="text-gray-700">
                        Te recomendamos que leas esta Política de Privacidad detenidamente. Si tienes preguntas o inquietudes sobre nuestras prácticas de privacidad, contacta con nosotros.
                    </p>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Información que Recopilamos</h3>
                    <div className="space-y-4">
                        <div>
                        <h4 className="font-bold text-gray-900 mb-2">Información que Proporcionas Voluntariamente:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Nombre, apellido, email y contraseña</li>
                            <li>Dirección de envío y de facturación</li>
                            <li>Información de pago y datos bancarios</li>
                            <li>Número de teléfono</li>
                            <li>Información del perfil (foto, descripción)</li>
                            <li>Comunicaciones y mensajes entre usuarios</li>
                        </ul>
                        </div>
                        <div>
                        <h4 className="font-bold text-gray-900 mb-2">Información Recopilada Automáticamente:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Dirección IP y ubicación geográfica</li>
                            <li>Tipo de navegador y dispositivo</li>
                            <li>Páginas visitadas y tiempo de permanencia</li>
                            <li>Búsquedas realizadas</li>
                            <li>Datos de cookies y tecnologías similares</li>
                        </ul>
                        </div>
                    </div>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Cómo Usamos tu Información</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Procesar transacciones y enviar confirmaciones</li>
                        <li>Verificar tu identidad y prevenir fraude</li>
                        <li>Mejorar y personalizar tu experiencia</li>
                        <li>Enviar comunicaciones de marketing (si consientes)</li>
                        <li>Cumplir con obligaciones legales</li>
                        <li>Analizar tendencias de uso de la plataforma</li>
                        <li>Atender solicitudes de soporte al cliente</li>
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Protección de Datos</h3>
                    <p className="text-gray-700 mb-4">
                        Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración y destrucción.
                    </p>
                    <div className="bg-blue-50 border-2 border-blue-400 p-4">
                        <p className="font-bold text-blue-900 mb-2">✓ Medidas de Seguridad:</p>
                        <ul className="list-disc list-inside text-blue-800 space-y-2 ml-4">
                        <li>Encriptación SSL de datos en tránsito</li>
                        <li>Contraseñas encriptadas en bases de datos</li>
                        <li>Autenticación de dos factores disponible</li>
                        <li>Firewalls y sistemas de detección de intrusiones</li>
                        <li>Auditorías de seguridad periódicas</li>
                        </ul>
                    </div>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Derechos del Usuario</h3>
                    <p className="text-gray-700 mb-4">Tienes derecho a:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Acceder a tu información personal</li>
                        <li>Corregir información inexacta</li>
                        <li>Solicitar la eliminación de tus datos</li>
                        <li>Revocar consentimientos previos</li>
                        <li>Optar por no recibir comunicaciones de marketing</li>
                        <li>Exportar tus datos en formato legible</li>
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Contacto</h3>
                    <p className="text-gray-700">
                        Para ejercer tus derechos o si tienes preguntas sobre esta política, contacta con nosotros:
                    </p>
                    <div className="bg-gray-100 border-2 border-gray-400 p-4 mt-4">
                        <p className="font-bold text-gray-900">e-Retro Legends Inc.</p>
                        <p className="text-gray-700">Email: privacy@retrolegends.com</p>
                        <p className="text-gray-700">Teléfono: +54 XXXX-XXXX</p>
                    </div>
                    </section>
                </div>
                </div>
            </div>
            )}

            {/* TÉRMINOS DE USO */}
            {activeTab === 'terms' && (
            <div id="terms" className="space-y-8">
                <div className="bg-white border-2 border-gray-400 p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">📋 Términos de Uso</h2>
                <p className="text-gray-600 mb-4">Última actualización: Noviembre 2025</p>

                <div className="space-y-8">
                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de Términos</h3>
                    <p className="text-gray-700">
                        Al acceder y utilizar e-Retro Legends, aceptas estar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte, no debes usar la plataforma.
                    </p>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Derechos de Uso</h3>
                    <p className="text-gray-700 mb-4">Te otorgamos una licencia limitada, no exclusiva e intransferible para:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Acceder y usar la plataforma con fines legales</li>
                        <li>Comprar y vender productos de acuerdo con estos términos</li>
                        <li>Crear contenido relacionado con tus transacciones</li>
                    </ul>
                    <p className="text-gray-700 mt-4">No puedes:</p>
                    <ul className="list-disc list-inside text-red-700 space-y-2 ml-4">
                        <li>Reproducir o distribuir contenido sin autorización</li>
                        <li>Utilizar la plataforma para actividades ilegales</li>
                        <li>Interferir con la funcionalidad del sitio</li>
                        <li>Realizar ingeniería inversa del código</li>
                        <li>Crear cuentas falsas o engañosas</li>
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Responsabilidades del Usuario</h3>
                    <div className="bg-yellow-50 border-2 border-yellow-400 p-4 space-y-3">
                        <p className="font-bold text-yellow-900">Como Comprador:</p>
                        <ul className="list-disc list-inside text-yellow-800 space-y-2 ml-4">
                        <li>Proporcionar información precisa de envío</li>
                        <li>Pagar el precio acordado</li>
                        <li>Asumir el riesgo de pérdida una vez recibido</li>
                        <li>Reportar problemas dentro de 30 días</li>
                        </ul>
                        <p className="font-bold text-yellow-900 pt-4">Como Vendedor:</p>
                        <ul className="list-disc list-inside text-yellow-800 space-y-2 ml-4">
                        <li>Vender solo productos auténticos y legales</li>
                        <li>Describir productos con precisión</li>
                        <li>Enviar productos dentro del plazo acordado</li>
                        <li>Responder consultas de forma oportuna</li>
                        <li>Aceptar devoluciones según política</li>
                        </ul>
                    </div>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibiciones</h3>
                    <p className="text-gray-700 mb-4">Está prohibido:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Publicar productos falsificados o ilegales</li>
                        <li>Realizar actividades fraudulentas o engañosas</li>
                        <li>Acosar, intimidar o discriminar a otros usuarios</li>
                        <li>Publicar contenido ofensivo o pornográfico</li>
                        <li>Utilizar bots o software de automatización no autorizado</li>
                        <li>Violar derechos de propiedad intelectual</li>
                        <li>Evadir medidas de seguridad</li>
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Resolución de Disputas</h3>
                    <p className="text-gray-700 mb-4">
                        En caso de disputa entre comprador y vendedor, e-Retro Legends proporcionará mediación neutral. Ambas partes deben cooperar en el proceso.
                    </p>
                    <p className="text-gray-700">
                        Si no se resuelve mediante mediación, las disputas se resolverán conforme a las leyes de Argentina.
                    </p>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Limitación de Responsabilidad</h3>
                    <p className="text-gray-700 mb-4">
                        E-RETRO LEGENDS NO SERÁ RESPONSABLE POR:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Daños indirectos, incidentales o consecuentes</li>
                        <li>Pérdida de beneficios o datos</li>
                        <li>Suspensión de servicios por problemas técnicos</li>
                        <li>Acciones de terceros</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        En ningún caso la responsabilidad total de la plataforma excederá el monto pagado por el usuario por la transacción específica que dio lugar al reclamo.
                    </p>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios en los Términos</h3>
                    <p className="text-gray-700">
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigencia cuando se publiquen en el sitio. Te notificaremos por email cuando los cambios sean significativos.
                    </p>
                    </section>
                </div>
                </div>
            </div>
            )}

            {/* POLÍTICA DE COOKIES */}
            {activeTab === 'cookies' && (
            <div id="cookies" className="space-y-8">
                <div className="bg-white border-2 border-gray-400 p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">🍪 Política de Cookies</h2>
                <p className="text-gray-600 mb-4">Última actualización: Noviembre 2025</p>

                <div className="space-y-8">
                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1. ¿Qué son las Cookies?</h3>
                    <p className="text-gray-700">
                        Las cookies son pequeños archivos de texto que se guardan en tu navegador cuando visitas nuestro sitio. Se utilizan para recordar información sobre tu visita y mejorar tu experiencia.
                    </p>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Tipos de Cookies que Usamos</h3>
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">Cookies Esenciales</h4>
                        <p className="text-gray-700">Necesarias para el funcionamiento básico del sitio (autenticación, seguridad).</p>
                        <p className="text-sm text-gray-600 mt-2">No se pueden desactivar en nuestros sistemas.</p>
                        </div>
                        <div className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">Cookies de Rendimiento</h4>
                        <p className="text-gray-700">Recopilan información sobre cómo usas el sitio (páginas visitadas, errores).</p>
                        <p className="text-sm text-gray-600 mt-2">Nos ayudan a mejorar la plataforma.</p>
                        </div>
                        <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">Cookies de Funcionalidad</h4>
                        <p className="text-gray-700">Recuerdan tus preferencias y personalizaciones.</p>
                        <p className="text-sm text-gray-600 mt-2">Ejemplo: idioma preferido, modo oscuro.</p>
                        </div>
                        <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-2">Cookies de Marketing</h4>
                        <p className="text-gray-700">Rastrean tu actividad para mostrar anuncios relevantes.</p>
                        <p className="text-sm text-gray-600 mt-2">Se utilizan servicios de terceros como Google Analytics.</p>
                        </div>
                    </div>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Consentimiento y Control</h3>
                    <p className="text-gray-700 mb-4">
                        Al visitar nuestro sitio por primera vez, mostraremos un banner de consentimiento. Puedes:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Aceptar todas las cookies</li>
                        <li>Rechazar cookies no esenciales</li>
                        <li>Personalizar tus preferencias</li>
                        <li>Revocar consentimiento en cualquier momento</li>
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies de Terceros</h3>
                    <p className="text-gray-700 mb-4">Utilizamos servicios de terceros que pueden establecer cookies:</p>
                    <div className="bg-gray-100 border-2 border-gray-400 p-4 space-y-3">
                        <div>
                        <p className="font-bold text-gray-900">Google Analytics</p>
                        <p className="text-gray-700 text-sm">Análisis de tráfico y comportamiento del usuario</p>
                        </div>
                        <div>
                        <p className="font-bold text-gray-900">Facebook Pixel</p>
                        <p className="text-gray-700 text-sm">Seguimiento de conversiones y publicidad</p>
                        </div>
                        <div>
                        <p className="font-bold text-gray-900">Stripe</p>
                        <p className="text-gray-700 text-sm">Procesamiento de pagos</p>
                        </div>
                        <div>
                        <p className="font-bold text-gray-900">SendGrid</p>
                        <p className="text-gray-700 text-sm">Email marketing y seguimiento</p>
                        </div>
                    </div>
                    </section>
                </div>
                </div>
            </div>
            )}

            {/* Final CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                <h3 className="text-2xl font-bold">¿Necesitas ayuda adicional?</h3>
                <p className="text-sm opacity-90">Contacta con nuestro equipo legal o soporte para consultas específicas.</p>
                </div>
                <div className="flex gap-4">
                <Link to="/help" className="bg-white text-green-700 px-6 py-3 font-bold rounded hover:bg-gray-100 transition">Centro de Ayuda</Link>
                <a href="mailto:legal@retrolegends.com" className="border-2 border-white px-6 py-3 font-bold rounded hover:bg-white hover:text-green-700 transition">Contactar Legal</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default LegalPage;