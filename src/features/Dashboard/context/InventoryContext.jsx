
import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

const INITIAL_PRODUCTS = [
  { id: 'PROD-001', name: 'Laptop Pro 16"', category: 'electronics', price: 1299.99, status: 'Disponible' },
  { id: 'PROD-002', name: 'Sudadera Algodón', category: 'clothing', price: 45.00, status: 'Bajo Stock' },
  { id: 'PROD-003', name: 'Lámpara Escritorio LED', category: 'home', price: 32.50, status: 'Disponible' },
  { id: 'PROD-004', name: 'Monitor Gamer 4K', category: 'electronics', price: 549.99, status: 'Agotado' },
  { id: 'PROD-005', name: 'Auriculares Noise Cancelling', category: 'electronics', price: 199.99, status: 'Disponible' },
];

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Función para agregar un nuevo producto desde el formulario
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      {
        id: `PROD-00${prevProducts.length + 1}`, // Autogeneración simple de ID
        status: 'Disponible',
        ...newProduct,
        price: parseFloat(newProduct.price)
      },
      ...prevProducts,
    ]);
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct }}>
      {children}
    </InventoryContext.Provider>
  );
}

// This hook is intentionally exported alongside the provider for this context.
// eslint-disable-next-line react-refresh/only-export-components
export function useInventory() {
  return useContext(InventoryContext);
}
