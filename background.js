let channelId = '';
let authorization = '';
let messages;
let emoji=[
    "😀","🤪","😠","🤔","😘","😭","🤩","😎","🥸","🤩","🥳","😏","😒","🤨","🧐","🤓","😎","🥸","🤩",
    "🥳","😏" ,"😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😓","😞","😕",
    "🫥 👽 😽 😮‍💨 😰 💪 👍 👐 😻 😴",
]
let intervalId = null;
function getMessages() {
    return new Promise((resolve, reject) => {
        const url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`; // 获取最近50条消息

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                messages = data.map(message => message.content)[Math.floor(Math.random() * 80)];
                console.log('Updated messages:', messages); // 打印存储的消息内容
                resolve();
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                reject(error);
            });
    });
}
function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomMessage() {
    let randomIndex = Math.floor(Math.random() * emoji.length);
    return messages+emoji[randomIndex];
}
function sendMessage(content) {
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
    let data = { content: content, nonce: `82329451214${Math.floor(Math.random() * 1000)}33232234`, tts: false };
    fetch(url, { method: 'POST', headers: { 'Authorization': authorization, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(result => { console.log('Message sent:', result); })
        .catch(error => { console.error('Error sending message:', error); });
}

function startSending() {
    if (intervalId) {
        clearTimeout(intervalId);
    }

    function sendNextMessage() {
        getMessages().then(() => {
            let messageToSend = getRandomMessage();
            sendMessage(messageToSend);
            let nextInterval = getRandomInterval(50000,80000); // 随机间隔时间（毫秒），例如 60 到 100 秒
            intervalId = setTimeout(sendNextMessage, nextInterval);
        });
    }
    sendNextMessage()
}


function stopSending() {
    if (intervalId) { clearTimeout(intervalId); intervalId = null; }

}

// Listener for commands from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "start") {
        channelId = request.channelId;
        authorization = request.authorization;
        startSending();
    } else if (request.command === "stop") {
        stopSending();
    }
    sendResponse({ status: "ok" });
});
