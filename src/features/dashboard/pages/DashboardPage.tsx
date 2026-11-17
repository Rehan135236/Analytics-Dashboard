export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">Executive Dashboard</h1>
        <p className="text-sm text-slate-400">
          Overview of key enterprise performance metrics and real-time operational status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$2,845,920', change: '+14.2%', positive: true },
          { label: 'Active Users', value: '48,219', change: '+8.1%', positive: true },
          { label: 'Conversion Rate', value: '3.42%', change: '-0.4%', positive: false },
          { label: 'System Health', value: '99.98%', change: 'Normal', positive: true },
        ].map((card, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 shadow-sm backdrop-blur-sm">
            <span className="text-xs font-medium text-slate-400">{card.label}</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-semibold text-white tracking-tight">{card.value}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                card.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
