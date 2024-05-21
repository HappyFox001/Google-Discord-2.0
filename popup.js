document.addEventListener('DOMContentLoaded', () => {
    // 加载存储的频道ID和授权令牌
    chrome.storage.sync.get(['channelId', 'authorization'], (result) => {
        if (result.channelId) {
            document.getElementById('channelId').value = result.channelId;
        }
        if (result.authorization) {
            document.getElementById('authorization').value = result.authorization;
        }
    });

    document.getElementById('startButton').addEventListener('click', () => {
        const channelId = document.getElementById('channelId').value;
        const authorization = document.getElementById('authorization').value;

        // 存储频道ID和授权令牌
        chrome.storage.sync.set({ channelId: channelId, authorization: authorization }, () => {
            console.log('Channel ID and Authorization Token saved.');
        });
        if (channelId!=='' && authorization!=='') {
            chrome.runtime.sendMessage({
                command: "start",
                channelId: channelId,
                authorization: authorization
            }, response => {
                console.log(response.status);
            });
        }
    });

    document.getElementById('stopButton').addEventListener('click', () => {
        chrome.runtime.sendMessage({ command: "stop" }, response => {
            console.log(response.status);
        });
    });
});
