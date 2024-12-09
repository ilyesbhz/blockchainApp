// Contract ABI (from Remix after deploying your contract)
const abi = [
    {
        "inputs": [{ "internalType": "string", "name": "_data", "type": "string" }],
        "name": "storeData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getData",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Deployed contract address (from Remix or testnet deployment)
const contractAddress = "0x0d0fC1Ae20fc34420341b0DA0E4bE475d12aC0D5";

let web3;
let contract;

// Initialize Web3 and Contract
window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Web3 initialized");
    } else {
        alert("Please install MetaMask!");
    }
};

// Function to store data
async function storeData() {
    const data = document.getElementById("dataInput").value;
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.storeData(data).send({ from: accounts[0] });
        alert("Data stored on blockchain!");
    } catch (error) {
        console.error(error);
        alert("Error storing data!");
    }
}

// Function to retrieve data
async function retrieveData() {
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await contract.methods.getData().call({ from: accounts[0] });
        document.getElementById("output").innerText = `Stored Data: ${result}`;
    } catch (error) {
        console.error(error);
        alert("Error retrieving data!");
    }
}
