require('dotenv').config(); // environment variables

const ethers = require('ethers');


const contractAddress = 'CONTRACT_ADDRESS';
const contractABI = [
    
];
const infuraUrl = 'INFURA_PROJECT_URL';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(infuraUrl);

// Initialize a wallet
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Send a message
async function sendMessageExample() {
    const receiverAddress = 'RECEIVER_ADDRESS'; // Replace with the recipient's address
    const content = 'Hello, Ethereum!';

    try {
        const tx = await contract.sendMessage(receiverAddress, content);
        await tx.wait();
        console.log('Message sent successfully!');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Get inbox messages
async function getInboxExample() {
    try {
        const inboxMessages = await contract.getInbox();
        console.log('Inbox Messages:');
        inboxMessages.forEach((message, index) => {
            console.log(`Message ${index + 1}:`);
            console.log(`Sender: ${message.sender}`);
            console.log(`Content: ${message.content}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error fetching inbox messages:', error);
    }
}

// Get sent messages
async function getSentMessagesExample() {
    try {
        const sentMessages = await contract.getSentMessages();
        console.log('Sent Messages:');
        sentMessages.forEach((message, index) => {
            console.log(`Message ${index + 1}:`);
            console.log(`Receiver: ${message.receiver}`);
            console.log(`Content: ${message.content}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error fetching sent messages:', error);
    }
}

// Run examples. Uncomment to run.
// sendMessageExample();
// getInboxExample(); 
// getSentMessagesExample(); 