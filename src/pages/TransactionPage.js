import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IconContext } from "react-icons";
import { BsXLg } from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';

import TransactionForm from "./TransactionForm";

import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


import { APIService } from "../services/api";




const parseTransaction = (t) => {
  return {
    id: t.id,
    date: new Date(t.date),
    crypto: t.crypto,
    quantite: parseFloat(t.quantite),
    prix: parseFloat(t.prix),
  }
}


function TransactionPage() {

  const [error, setError] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [cotations, setCotations] = useState([]);


  const [show, setShow] = useState(false);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    APIService.getTransaction()
      .then(
        (result) => {
          result = result.map(parseTransaction);
          result = result.sort((a, b) => b.date - a.date);
          setTransactions(result);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  const parseCotation = (c) => {
    return {
      crypto: c.crypto,
      date: new Date(c.date),
      prix: parseFloat(c.prix),
      change: parseFloat(c.change)
    }
  }

  useEffect(() => {
    APIService.getCotation()
      .then(
        (result) => {
          result = result.map(parseCotation);
          setCotations(result);
        },
        (error) => {

        }
      )
  }, [])


  const onClick = (t) => {
    setTransaction(t);
    setShow(true)
  }

  const updateTransaction = (t) => {
    setShow(false);
    const filter = transactions.filter((e) => e.id !== t.id);
    setTransactions([...filter, parseTransaction(t)].sort((a, b) => b.date - a.date));
  }

  const deleteTransaction = (t) => {
    setShow(false);
    setTransactions(transactions.filter((e) => e.id !== t.id));
  }

  const handleClose = () => setShow(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" >

        <div className="container-fluid">
          <Link className="navbar-brand" to="/actifs" >
            <BsXLg />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            Historiques des transactions
          </div>
        </div>
      </Navbar>
      <IconContext.Provider value={{ color: "white" }}>

        <div className='d-flex flex-column p-3 h-100 mt-5' >

          <div className='flex-fill'> </div>
          <div className='flex-fill'>
            <Table responsive className='text-white bg-dark'>
              <tbody>
                {
                  transactions.map((t, i) => (
                    <tr key={i} onClick={(e) => onClick(t)}>
                      <td>{t.date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })} </td>
                      <td>{t.crypto}</td>
                      <td>{t.prix.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })} </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>
      </IconContext.Provider>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm transaction={transaction} cotations={cotations} update={updateTransaction} deleteCb={deleteTransaction} />
        </Modal.Body>
      </Modal>
      {error ? <Alert variant='warning'>{error}</Alert> : ''}
    </>
  );
}

export default TransactionPage;
