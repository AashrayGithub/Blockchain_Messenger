// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Messenger {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;
    mapping(address => Message[]) public userMessages;

    function sendMessage(address _receiver, string calldata _content) external {
        require(_receiver != msg.sender, "Cannot send a message to yourself");
        Message memory message = Message(msg.sender, _receiver, _content, block.timestamp);
        messages.push(message);
        userMessages[_receiver].push(message);
    }

    function getInbox() external view returns (Message[] memory) {
        return userMessages[msg.sender];
    }

    function getSentMessages() external view returns (Message[] memory) {
        uint256 sentCount = 0;
        for (uint256 i = 0; i < messages.length; i++) {
            if (messages[i].sender == msg.sender) {
                sentCount++;
            }
        }

        Message[] memory sentMessages = new Message[](sentCount);
        sentCount = 0;
        for (uint256 i = 0; i < messages.length; i++) {
            if (messages[i].sender == msg.sender) {
                sentMessages[sentCount] = messages[i];
                sentCount++;
            }
        }
        return sentMessages;
    }
}
