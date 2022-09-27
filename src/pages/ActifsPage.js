import React, { useState, useEffect } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import SpinnerPage from "../components/spinnerPage";
import Alert from 'react-bootstrap/Alert';
import { BsCircle, BsPlus, BsArrowUpRight, BsArrowDownRight, BsArrowRight, BsJournalText } from "react-icons/bs";
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import { APIService } from "../services/api";

const IconStack = styled.span`
  display: grid;
  svg {
    grid-area: 1 / 1;
  }
`;

const Blue = styled.span`
  color: blue;
`;

function ActifsPage() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [valuation, setValuation] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    APIService.getValuation()
      .then(
        (result) => {
          setIsLoaded(true);
          setValuation(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    var total = 0
    valuation.forEach(v => {
      total += parseFloat(v.valuation);
    });
    setTotal(total);
  }, [valuation])

  if (!isLoaded) {
    return (<SpinnerPage />)
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top" >

          <div className="container-fluid">
            <Link className="navbar-brand" to="/transaction" >
              <BsJournalText size={30} color={"blue"} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="justify-content-right">
              <Link to="/administration" >
                <IconStack>
                  <BsCircle size={34} color={"grey"} />
                  <BsPlus size={34} color={"blue"} style={{ position: 'absolute', zIndex: 99 }} />
                </IconStack></Link>
            </div>
          </div>

        </Navbar>

        <div className='d-flex flex-column p-3 h-100'>
          <div></div>
          <h1 className=' text-center m-5' color={"grey"}><Link to="/evolution" style={{ textDecoration: 'none', color: 'grey' }}> <Blue>{total > 0 ? '+' : '-'}</Blue>{Math.abs(total).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          })} </Link></h1>

          <Table responsive className='text-white bg-dark'>
            <tbody>
              {
                valuation.map((v, i) => (
                  <tr key={i}>
                    <td>{v.crypto} ({v.nom})</td>
                    <td>{Math.abs(v.change) < 5 ? <BsArrowRight /> : (v.change > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />)}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <div className='flex-fill'></div>
          <div className='flex-fill'></div>
        </div>
        {error ? <Alert variant='warning'>{error}</Alert> : ''}
      </>
    );
  }
}

export default ActifsPage;
