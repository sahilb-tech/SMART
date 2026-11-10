export default function StatCard({ label, value, note, icon: Icon }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={19}/></span></div><strong>{value}</strong><small>{note}</small></article>
}
