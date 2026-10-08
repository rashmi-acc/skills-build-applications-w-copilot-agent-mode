function formatValue(value, field) {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.title ?? value._id ?? '—';
  }
  if (field === 'date') {
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleDateString();
  }
  return String(value);
}

export default function ResourceTable({ title, description, columns, items, loading, error, refresh }) {
  return (
    <section aria-labelledby="resource-title">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1 id="resource-title">{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        <button className="btn btn-outline-secondary refresh-button" onClick={refresh} type="button">
          Refresh
        </button>
      </div>

      {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
      <div className="table-responsive resource-table-wrap">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.field} scope="col">{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="table-message" colSpan={columns.length}>Loading {title.toLowerCase()}…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="table-message" colSpan={columns.length}>No {title.toLowerCase()} found.</td></tr>
            ) : items.map((item, index) => (
              <tr key={item._id ?? item.id ?? item.email ?? index}>
                {columns.map((column) => (
                  <td key={column.field}>{formatValue(item[column.field], column.field)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="result-count" aria-live="polite">
        {loading ? 'Loading records' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
      </p>
    </section>
  );
}