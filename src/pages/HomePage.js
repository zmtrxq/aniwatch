import StatusMessage from '../components/StatusMessage';

function HomePage() {
  return (
    <>
      <div className="page-title-row">
        <h1>Top Anime</h1>
      </div>

      <StatusMessage success successText="Routing is ready" />
      <div className="empty-state">Anime catalog will be added soon.</div>
    </>
  );
}

export default HomePage;
