import { useEffect, useState } from "react";
import Web3 from "web3";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Ensure this is set correctly
const ABI = [
  /* Add your contract ABI here */
];

const CriminalDataComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [crime, setCrime] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [criminalInfo, setCriminalInfo] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (typeof window.ethereum !== "undefined") {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  const addCriminal = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      await contract.methods
        .addCriminal(name, crime, CNIC)
        .send({ from: account });
      alert("Criminal data added successfully!");
    }
  };

  const retrieveCriminal = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      const info = await contract.methods.getCriminal(CNIC).call();
      setCriminalInfo({ name: info[0], crime: info[1] });
    }
  };

  return (
    <div>
      <h1>Criminal Data Management</h1>
      <div>
        <h2>Add Criminal Data</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Crime"
          value={crime}
          onChange={(e) => setCrime(e.target.value)}
        />
        <input
          type="text"
          placeholder="CNIC"
          value={CNIC}
          onChange={(e) => setCNIC(e.target.value)}
        />
        <button onClick={addCriminal}>Add Criminal</button>
      </div>
      <div>
        <h2>Retrieve Criminal Data</h2>
        <input
          type="text"
          placeholder="CNIC"
          value={CNIC}
          onChange={(e) => setCNIC(e.target.value)}
        />
        <button onClick={retrieveCriminal}>Retrieve Criminal</button>
        {criminalInfo && (
          <div>
            <p>Name: {criminalInfo.name}</p>
            <p>Crime: {criminalInfo.crime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriminalDataComponent;
