import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let passwordRef = useRef(null); 
  let [password, setpassword] = useState("");
  let [length, setlength] = useState("8");
  let [takechar, settakechar] = useState(false);
  let [takenum, settakenum] = useState(false);

  let generatePassword = () => {
    let password = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (takenum) str += "1234567890";
    if (takechar) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(index);
      setpassword(password);
    }
  };
  let copyClipbooard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    generatePassword();
  }, [length, takechar, takenum]);

  return (
    <>
      <h1>Password Generator</h1>
      <div id="main">
        <input type="text" readOnly value={password} ref={passwordRef} id="password" />
        <button onClick={copyClipbooard}><i class="fa-solid fa-copy" style={{ color: "white", backgroundColor: "transparent" }}></i> Copy</button>
      </div>
      <div id="input">
        <div>
          <input type="range" min={8} max={16} id="range" name="rangeinput" value={length} onChange={(event) => setlength(event.target.value)} />
          <label>Length:{length}</label>
        </div>
        <div>
          <input type="checkbox" id="forno" checked={takenum} onChange={() => settakenum(!takenum)} />
          <label htmlFor="forno">Numbers</label>
        </div>
        <div>
          <input type="checkbox" id="forchar" checked={takechar} onChange={() => settakechar(!takechar)} />
          <label htmlFor="forchar">Special characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
