
import { Card } from '../../../components/Card';

const DATA = [
  { label: 'Ene', value: 45 },
  { label: 'Feb', value: 70 },
  { label: 'Mar', value: 60 },
  { label: 'Abr', value: 90 },
  { label: 'May', value: 85 },
  { label: 'Jun', value: 110 },
];

export function SimpleChart() {
  return (
    <Card title="Ingresos Semestrales (en miles USD)">
      <div className="h-64 flex items-stretch justify-between gap-2 pt-4" aria-label="Gráfico de barras de ingresos mensuales">
        {DATA.map((item) => (
          <div key={item.label} className="group relative min-h-0 flex-1 flex flex-col items-center gap-2">
            {/* Contenedor de la barra interactiva con animaciones reducidas respetadas */}
            <div className="min-h-0 w-full bg-neutral-100 dark:bg-neutral-800 rounded-t-md flex-1 flex items-end">
              <div 
                style={{ height: `${(item.value / 120) * 100}%` }}
                className="w-full rounded-t-md bg-linear-to-t from-neutral-400 to-neutral-600 transition-all duration-500 group-hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 motion-reduce:transition-none dark:from-neutral-700 dark:to-neutral-500"
                role="img"
                aria-label={`Ingresos en ${item.label}: $${item.value}k`}
                tabIndex={0}
              />
            </div>
            <span
              className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-neutral-100 dark:text-neutral-900"
              aria-hidden="true"
            >
              Ingresos en {item.label}: ${item.value}k
            </span>
            <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
