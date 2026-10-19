function StatCard({ title, value, hint, tone = 'blue' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{value}</div>
      <div>
        <p className="card-label">{title}</p>
        <h3>{value}</h3>
        <small>{hint}</small>
      </div>
    </div>
  );
}

export default StatCard;
