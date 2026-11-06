
import { useState } from 'react';
import { Card } from '../../../components/Card';
import { useInventory } from '../context/InventoryContext';

export function ProductForm() {
  // 1. Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    tags: [''], // Array dinámico para múltiples campos
  });

  // 2. Estado de errores para accesibilidad visual y auditiva
  const [errors, setErrors] = useState({});

  const { addProduct } = useInventory();

  // Validaciones básicas manuales
  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'name' && value.trim().length < 3) {
      errorMsg = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (name === 'price' && (isNaN(value) || Number(value) <= 0)) {
      errorMsg = 'El precio debe ser un número mayor a 0.';
    }
    if (name === 'category' && !value) {
      errorMsg = 'Por favor, selecciona una categoría.';
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // 3. Manejo de campos dinámicos (tags)
  //const handleTagChange = (index, value) => {
  //  const newTags = [...formData.tags];
  //  newTags[index] = value;
  //  setFormData(prev => ({ ...prev, tags: newTags }));
  //};

  // 4. Envío del Formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todo antes de enviar
    validateField('name', formData.name);
    validateField('category', formData.category);
    validateField('price', formData.price);

    //const hasErrors = Object.values(errors).some(msg => msg !== '') || 
    //                  !formData.name || !formData.price || !formData.category;

    if (errors.name || errors.price || errors.category || !formData.name || !formData.price || !formData.category) {
      document.getElementById('name')?.focus();
      return;
    }

    // Guardar en el Contexto Global
    addProduct(formData);
    
    // Resetear formulario de forma limpia
    setFormData({ name: '', category: '', price: '', tags: [''] });
    alert('¡Producto agregado al inventario global! 🚀');
  };

  return (
    <Card title="Registrar Nuevo Producto">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl" noValidate>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Nombre *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-card text-text-dashboard text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500" />
          {errors.name && <p className="text-xs text-rose-500" role="alert">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Categoría *</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-card text-text-dashboard text-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400">
              <option value="">Selecciona</option>
              <option value="electronics">Electrónica</option>
              <option value="clothing">Ropa y Textil</option>
              <option value="home">Hogar</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Precio *</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-card text-text-dashboard text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400" />
            {errors.price && <p className="text-xs text-rose-500" role="alert">{errors.price}</p>}
          </div>
        </div>

        <button type="submit" className="w-full mt-2 px-4 py-2 rounded-xl text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 cursor-pointer hover:opacity-90">
          Guardar Producto
        </button>
      </form>
    </Card>
  );
}
