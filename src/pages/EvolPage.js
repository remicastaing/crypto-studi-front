import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsXLg } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { APIService } from "../services/api";

import "chartjs-adapter-moment";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend
);




function EvolutionPage() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [choix, setChoix] = useState('Toutes');

  const parseCumul = (c) => {
    return {
      date: new Date(c.date),
      crypto: c.crypto,
      cotation: parseFloat(c.cotation),
      gain: parseFloat(c.gain),
      quantite: parseFloat(c.quantite),
      valuation: parseFloat(c.valuation)
    }
  }

  useEffect(() => {
    APIService.getCumuls()
      .then(
        (result) => {
          setIsLoaded(true);
          var dates = result.map(c => c.date).filter((v, i, a) => a.indexOf(v) === i).map(d => new Date(d));
          result = result.map(parseCumul)

          var cryptos = result.map(c => c.crypto).filter((v,
            i, a) => a.indexOf(v) === i);
          setCryptos(['Toutes', ...cryptos]);

          setDates(dates);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    var filteredData = []
    if (choix === 'Toutes') {
      dates.forEach(date => {
        var cumul = data.filter(v => v.date.getTime() === date.getTime()).reduce((p, c) => { return { x: date, y: p.y + c.gain } }, { x: date, y: 0 });
        filteredData.push(cumul)
      });
    } else {
      filteredData = data.filter(row => row.crypto === choix).map(row => { return { x: row.date, y: row.gain } });

    }

    setFilteredData(filteredData);




  }, [data, choix, dates]);

  const options = {
    response: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month"
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: true,
        text: choix
      }
    }
  };

  const dataSets = {
    datasets: [
      {
        data: filteredData,
        borderColor: 'rgb(75, 192, 192)',
      }
    ]
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className='d-flex flex-row p-3'>
        <div className=''>
          <Link to="/actifs" ><BsXLg />
          </Link>
        </div>
        <div className='flex-fill text-center'>Evolution des gains</div>
        <div className=''>
          <BsXLg className="invisible" />
        </div>
      </div>
      <div className="p-2 flex-fill"></div>
      {isLoaded ? <Chart type='line' data={dataSets} options={options} /> : <Spinner />}
      <Form.Select aria-label="Default select example" onChange={e => {
        setChoix(e.target.value);
      }}>
        {cryptos.map((crypto) => (
          <option key={crypto}>{crypto}</option>
        ))}
      </Form.Select>
      <Link to="/actifs" className="btn btn-primary my-2">Consulter vos actifs</Link>
      <div className="p-2 flex-fill"></div>
      {error ? <Alert variant='warning'>{error}</Alert> : ''}
    </div>
  );
}

export default EvolutionPage;
