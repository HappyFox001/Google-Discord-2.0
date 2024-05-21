# Google扩展Discord机器人

### 一、使用方法

1.将源代码下载至本地解压后，登入[Google扩展中心](chrome://extensions/)后进入开发者模式，选择加载已解压的扩展程序。

2.在扩展处打开Discord Message Bot，输入Channel ID和Authorization Token登入即可。

### 二、执行方法

在时间间隔50s-80s，从对话历史中爬取过去100条聊天，并随机选择其中一条进行复制后加入一个表情包回复。

1.爬取消息的函数

```
function getMessages() {
    return new Promise((resolve, reject) => {
        const url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`; // 获取最近100条消息

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
```

2.发送消息的函数

```
function sendMessage(content) {
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
    let data = { content: content, nonce: `82329451214${Math.floor(Math.random() * 1000)}33232234`, tts: false };
    fetch(url, { method: 'POST', headers: { 'Authorization': authorization, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(result => { console.log('Message sent:', result); })
        .catch(error => { console.error('Error sending message:', error); });
}
```

### 三、适用方向 

1.进一步开发水群机器人。

2.与比特浏览器联合使用，完成IP隔离的多号水群刷活跃度。

# Google Extension for Discord Bot

## Usage Instructions

1. **Download and Setup:**
   - Download the source code and extract it locally.
   - Log in to the Google Extensions Center, enable Developer Mode, and select "Load unpacked" to load the extracted extension.
2. **Login:**
   - Open the Discord Message Bot extension, enter the Channel ID and Authorization Token to log in.

## Execution Method

At intervals of 50 to 80 seconds, the bot will fetch the last 100 messages from the chat history, randomly select one, and reply with it along with an emoji.

1. **Function to Fetch Messages**

   ```
   function getMessages() {
       return new Promise((resolve, reject) => {
           const url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`; // 获取最近100条消息

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
   ```

2. **Function to Send Messages**

```
function sendMessage(content) {
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
    let data = { content: content, nonce: `82329451214${Math.floor(Math.random() * 1000)}33232234`, tts: false };
    fetch(url, { method: 'POST', headers: { 'Authorization': authorization, 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(result => { console.log('Message sent:', result); })
        .catch(error => { console.error('Error sending message:', error); });
}
```

## Applicable Scenarios

1. **Further Development of Group Chat Bots:**
   - Enhance and customize bots for engaging in group chats.
2. **Combining with Browser Automation:**
   - Use in conjunction with tools like IP-isolating browsers to manage multiple accounts and boost activity in group chats.