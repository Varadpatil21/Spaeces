import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Setup } from './Setup/Setup';

function App() {
  const [Player1Num, setPlayer1Num1] = useState([]);
  const [Player2Num, setPlayer2Num1] = useState([]);

  useEffect(() => {
    const storedPlayer1Num = localStorage.getItem('player1Numbers');
    const storedPlayer2Num = localStorage.getItem('player2Numbers');

    if (storedPlayer1Num && storedPlayer2Num) {
      setPlayer1Num1(JSON.parse(storedPlayer1Num));
      setPlayer2Num1(JSON.parse(storedPlayer2Num));
    } else {
      axios.get("http://localhost:4000/player").then(() => {
        axios.get("http://localhost:4000/player/player1").then(res => {
          const player1Numbers = res.data.number;
          setPlayer1Num1(player1Numbers);
          localStorage.setItem('player1Numbers', JSON.stringify(player1Numbers));
        });
        axios.get("http://localhost:4000/player/player2").then(res => {
          const player2Numbers = res.data.number;
          setPlayer2Num1(player2Numbers);
          localStorage.setItem('player2Numbers', JSON.stringify(player2Numbers));
        });
      }).catch(error => console.log(error));
    }
    return () => {
      localStorage.removeItem('player1Numbers');
      localStorage.removeItem('player2Numbers');
    };
  }, []);

  return (
    <div>
      <h1>Player 1 Numbers</h1>
      <ul>{Player1Num.map(num => {
        return <li key={num}>{num}</li>
      })}</ul>
      <h1>Player 2 Numbers</h1>
      <ul>{Player2Num.map(num => {
        return <li key={num}>{num}</li>
      })}</ul>
    <Setup/>
    </div>
  )
}

export default App
