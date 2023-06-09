import { useState } from 'react';
import './App.css';
import Flightform from './Flightform';
import Modal from './Modal';
import LoadingBar from 'react-top-loading-bar'



function App() {
  const [progress, setProgress] = useState(0)
  const prog = (p) => {
    setProgress(p)

  }
  return (
    <div className="App">
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
      <Flightform progress={prog} />
      <Modal />
    </div>
  );
}

export default App;
