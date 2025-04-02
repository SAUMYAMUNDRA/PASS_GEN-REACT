import { useCallback, useState, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const copyPassToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "{}[];";

    for (let i = 0; i < length; i++) { 
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numbersAllowed, passwordGenerator]);

  return (
    <div className=" mt-40 w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-5 text-orange-500 overflow-hidden mb-4 bg-gray-500">
      <h1 className="text-white mb-3 text-center mt-4 text-2xl font-bold">Pass Generator</h1>

      <div className="flex shadow rounded-xl overflow-hidden mb-4">
        <input 
          type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3" 
          placeholder="Password" 
          readOnly 
        />
        <button onClick={()=>{
          alert("text-copied")
          copyPassToClipboard}
           } className="bg-blue-700 p-2 outline-none text-white font-bold">Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
            type="range"  
            min={1}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value, 10))} 
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox" 
            checked={numbersAllowed}
            className="cursor-pointer"
            id="numberinput"
            onChange={() => setNumbersAllowed(prev => !prev)} 
          />
          <label htmlFor="numberinput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox" 
            checked={charAllowed}
            className="cursor-pointer"
            id="charsinput"
            onChange={() => setCharAllowed(prev => !prev)} 
          />
          <label htmlFor="charsinput">Chars</label>
        </div>
      </div>
    </div>
  );
}

export default App;
