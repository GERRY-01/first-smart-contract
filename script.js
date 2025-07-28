const contractAddress = '0x9b917436058420a5466cb772fa8aafb42a35404b';

const contractABI = [
	{
		"inputs": [],
		"name": "generatecomputermove",
		"outputs": [
			{
				"internalType": "enum RockPaperScissors.Move",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_move",
				"type": "string"
			}
		],
		"name": "play",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

async function submitMove() {
    const userMove = document.getElementById('userMove').value;
    const result = document.getElementById('result-text');

    if (!userMove) {
        result.textContent = 'Please enter a move.';
        return;
    }
    if (userMove !== 'Rock' && userMove !== 'Paper' && userMove !== 'Scissors') {
        result.textContent = 'Please enter a valid move.';
        return;
    }
    if (typeof window.ethereum === 'undefined') {
        result.textContent = 'Please install MetaMask.';
        return;
    }

    try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const output = await contract.play(userMove);
        let computerMove = await contract.generatecomputermove();

        // making the computermove to user friendly

        if (computerMove === 0) {
            computerMove = 'Rock';
        } else if (computerMove === 1) {
            computerMove = 'Paper';
        } else if (computerMove === 2) {
            computerMove = 'Scissors';
        }
        result.textContent = `You played ${userMove}. The computer played ${computerMove}. ${output}`;
    } catch (error) {
        console.error(error);
        result.textContent = 'Error :' + error.message;
    }
}