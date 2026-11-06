import { AdminLayout } from '../../layouts/AdminLayout';
import { MetricsGrid } from './components/MetricsGrid';
import { SimpleChart } from './components/SimpleChart';
import { ProductForm } from './components/ProductForm';
import { DataTable } from './components/DataTable';
import { InventoryProvider } from './context/InventoryContext';

export function DashboardPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Panel de Control
        </h1>
      </div>

      {/* Envolvemos los componentes dependientes en el proveedor común */}
      <InventoryProvider>
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-6">
          <ProductForm />
          <SimpleChart />
        </div>

        <div className="w-full">
          <DataTable />
        </div>
      </InventoryProvider>
    </AdminLayout>
  );
}