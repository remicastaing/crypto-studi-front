// import logo from '../assets/logo.svg';
import './home.css';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomePage() {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Lalalist</h1>
          <p className="lead text-muted">Mettez vos taches en musiques.</p>
          <p>
            <a href="/listes/" className="btn btn-primary my-2">Consulter les listes</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
