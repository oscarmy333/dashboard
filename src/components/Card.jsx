
export function Card({ title, children }) {
  return (
    <section className="@container bg-card border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl p-6 shadow-xs">
      {title && <h2 className="font-semibold text-sm text-neutral-500 dark:text-neutral-400 mb-4">{title}</h2>}
      {/* Si el contenedor mide más de 400px (@md), expandimos el espacio interno */}
      <div className="w-full @md:p-2">
        {children}
      </div>
    </section>
  );
}
