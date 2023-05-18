import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const ocrLoad = async () => {
    const worker = await createWorker({
      logger: m => console.log(m)
    });

    await worker.loadLanguage('eng+chi_sim+jpn+vie');
    await worker.initialize('eng+chi_sim+jpn+vie');
    const { data: { text } } = await worker.recognize('https://live.staticflickr.com/1688/24239157749_1a7a931b10_b.jpg');

    //- chinese
    // https://www.hackingchinese.com/wp-content/uploads/2018/11/12y.jpg
    //- eng
    // https://tesseract.projectnaptha.com/img/eng_bw.png
    // https://1.bp.blogspot.com/-gdjsJ7XAvLo/WQgjTnDWDgI/AAAAAAABNl8/YhDEW9xAxuUOf7lhVOdVjnxZY6cRV_OkACLcB/s1600/blur-reading-challenge.png

    await worker.terminate();
    setOcr(text);
  }

  const doOCR = async () => {

    //- ocrLoad
    await ocrLoad()
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
