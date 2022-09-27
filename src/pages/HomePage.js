// import logo from '../assets/logo.svg';
import './home.css';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="p-2 flex-fill"></div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Crypto Studi</h1>
            <p className="lead text-muted">Suivez votre portefeuille de crypto actifs.</p>
            <p>
              <Link to="/actifs" className="btn btn-primary my-2">Consulter vos actifs</Link>

            </p>
          </div>
        </div>
      </section>
      <div className="p-2 flex-fill"></div>
    </div>
  );
}

export default HomePage;
