function StatusMessage({ loading, error, success, successText }) {
  if (loading) {
    return <div className="status-box">Loading...</div>;
  }

  if (error) {
    return <div className="status-box error">{error}</div>;
  }

  if (success) {
    return <div className="status-box success">{successText}</div>;
  }

  return null;
}

export default StatusMessage;
