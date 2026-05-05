import { Link, useParams } from 'react-router-dom';

function AnimeDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <div className="page-title-row">
        <h1>Anime Details</h1>
        <Link className="nav-link" to="/">
          Back
        </Link>
      </div>

      <div className="empty-state">Anime profile placeholder for #{id}</div>
    </>
  );
}

export default AnimeDetailsPage;
