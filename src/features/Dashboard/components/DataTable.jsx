
import { useState } from 'react';
import { Card } from '../../../components/Card';
import { useInventory } from '../context/InventoryContext';

//const INITIAL_PRODUCTS = [
//  { id: 'PROD-001', name: 'Laptop Pro 16"', category: 'Electrónica', price: 1299.99, status: 'Disponible' },
//  { id: 'PROD-002', name: 'Sudadera Algodón', category: 'Ropa y Textil', price: 45.00, status: 'Bajo Stock' },
//  { id: 'PROD-003', name: 'Lámpara Escritorio LED', category: 'Hogar', price: 32.50, status: 'Disponible' },
//  { id: 'PROD-004', name: 'Monitor Gamer 4K', category: 'Electrónica', price: 549.99, status: 'Agotado' },
//  { id: 'PROD-005', name: 'Auriculares Noise Cancelling', category: 'Electrónica', price: 199.99, status: 'Disponible' },
//];

export function DataTable() {
  const { products } = useInventory(); // Consumo dinámico
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Límite por página (ajustable)

  // Filtrado de elementos
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cálculos matemáticos de paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Card title="Inventario de Productos Global">
      <div className="space-y-4">
        
        {/* Input Buscador */}
        <div className="relative max-w-xs">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar producto..."
            className="w-full pl-8 pr-4 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-card text-text-dashboard outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          />
          <span className="absolute left-2.5 top-2 text-neutral-400 text-xs" aria-hidden="true">🔍</span>
        </div>

        {/* Tabla HTML */}
        <div className="overflow-x-auto border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl bg-card">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="hidden md:table-header-group bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 font-semibold border-b border-neutral-200/60 dark:border-neutral-800/60">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 block md:table-row-group">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="block md:table-row p-4 md:p-0">
                  <td className="flex md:table-cell justify-between md:px-6 md:py-3.5 font-mono text-xs text-neutral-400">{product.id}</td>
                  <td className="flex md:table-cell justify-between md:px-6 md:py-3.5 font-medium text-neutral-900 dark:text-neutral-100">{product.name}</td>
                  <td className="flex md:table-cell justify-between md:px-6 md:py-3.5">${product.price.toFixed(2)}</td>
                  <td className="flex md:table-cell justify-between md:px-6 md:py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BARRA DE CONTROLES DE PAGINACIÓN ACCESIBLE */}
        <nav className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800" aria-label="Controles de navegación de la tabla">
          <div className="text-xs text-neutral-500 dark:text-neutral-400" aria-live="polite">
            Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{totalPages}</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer bg-card hover:bg-neutral-50 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-400 outline-none"
              aria-label="Ir a la página anterior"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer bg-card hover:bg-neutral-50 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-400 outline-none"
              aria-label="Ir a la página siguiente"
            >
              Siguiente
            </button>
          </div>
        </nav>

      </div>
    </Card>
  );
}
