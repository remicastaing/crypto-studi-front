import React, { useState, useEffect } from 'react';

import { IconContext } from "react-icons";
import { FaCoins, FaEuroSign, FaSearch, FaCalendar, FaTrash } from "react-icons/fa";

import { APIService } from "../services/api";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function TransactionForm({transaction, cotations, update, deleteCb}) {


  const [cryptoList, setCryptoList] = useState([]);


  const [defaultPrix, setDefaultPrix] = useState(null);


  const [date, setDate] = useState(transaction.date);
  const [crypto, setCrypto] = useState(transaction.crypto);
  const [quantite, setQuantite] = useState(transaction.quantite);
  const [prix, setPrix] = useState(transaction.prix);


  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    var cryptoList = cotations.map(c => c.crypto).filter((v,
      i, a) => a.indexOf(v) === i);
    setCryptoList(cryptoList);
  }, [cotations])

  useEffect(() => {
    setDefaultPrix(quantite && crypto ? parseFloat(quantite) * crypto?.prix: '');}
  , [quantite, crypto]);


  useEffect(() => {
    setDisabled( ! (quantite && crypto));}
  , [quantite, crypto]);


  const selectCrypto = (e) => {
    var sc = cotations.filter(v=> v.crypto === e.target.value)[0];
    setCrypto(sc);
    setDisabled(selectCrypto !== null && quantite != null)
  }


  const submit = () => {
    APIService.updateTransaction(transaction.id, date , crypto.crypto, quantite, prix || defaultPrix).then((result) => {
      console.log(result);
      deleteCb(result);
    })
  }

  const deleteTransaction = () => {
    APIService.deleteTransaction(transaction.id, date , crypto.crypto, quantite, prix || defaultPrix).then((result) => {
      deleteCb(transaction);
    })
  }



  return (
    <IconContext.Provider value={{ color: "white" }}>
          <InputGroup className="mb-5">
            <InputGroup.Text className='text-white bg-dark'><FaCalendar /></InputGroup.Text>
            <Form.Control type="date" id="inlineFormInputGroup" placeholder="date" className='text-white bg-dark' defaultValue={date.toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)}/>
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text className='text-white bg-dark'><FaSearch /></InputGroup.Text>
            <Form.Select aria-label="Default select example" className='text-white bg-dark' value={transaction.crypto} onChange={selectCrypto} >
              <option className="text-black-50">Sélectionner une crypto</option>
              {cryptoList.map(c => (<option key={c} value={c} >{c}</option>))}
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text className='text-white bg-dark'><FaCoins /></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Quantité" className='text-white bg-dark' defaultValue={transaction.quantite} onChange={(e) => setQuantite(e.target.value)}/>
          </InputGroup>
          <InputGroup className="mb-5">
            <InputGroup.Text className='text-white bg-dark'><FaEuroSign /></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Prix d'prix" className='text-white bg-dark' defaultValue={transaction.prix} onChange={(e) => setPrix(e.target.value)}/>
          </InputGroup>
        <div className='flex-fill text-center'> <Button  className="btn text-white bg-dark btn-outline-light my-2" onClick={submit} disabled={disabled}>Mettre à jour</Button></div>
        <div className='flex-fill text-center'> <Button  variant="danger" onClick={deleteTransaction} disabled={disabled}><FaTrash/>Supprimer</Button></div>
    </IconContext.Provider>
  );
}

export default TransactionForm;
