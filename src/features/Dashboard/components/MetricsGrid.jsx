
import { Card } from '../../../components/Card';

const METRICS_DATA = [
  { id: 1, title: 'Ventas Totales', value: '$45,231.89', change: '+12.5%', isPositive: true },
  { id: 2, title: 'Nuevos Clientes', value: '+2,350', change: '+4.3%', isPositive: true },
  { id: 3, title: 'Tasa de Conversión', value: '2.48%', change: '-0.8%', isPositive: false },
  { id: 4, title: 'Sesiones Activas', value: '1,204', change: '+24.1%', isPositive: true },
];

export function MetricsGrid() {
  return (
    // Rejilla principal: 1 columna en móvil, 2 en tablets, 4 en pantallas de escritorio
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {METRICS_DATA.map((metric) => (
        <Card key={metric.id}>
          {/* El contenedor interior monitorea su propio tamaño (@container heredado de Card) */}
          <div className="flex flex-col justify-between h-full gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {metric.title}
              </span>
              {/* Contenedor decorativo de ícono (se puede reemplazarlo por un SVG) */}
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500" aria-hidden="true">
                ⚡
              </div>
            </div>

            {/* Ajustamos dinámicamente el tamaño del texto según el ancho de la tarjeta */}
            <div className="flex items-baseline justify-between mt-2 @xs:flex-row flex-col gap-1">
              <span className="text-2xl @xs:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {metric.value}
              </span>
              
              {/* Badge de porcentaje con alto contraste accesible */}
              <span 
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                  metric.isPositive 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400' 
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400'
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
