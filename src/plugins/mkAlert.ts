function mkAlert(message: string, duration = 3000) {
    // 创建消息容器元素
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translateX(-50%)';
    messageContainer.style.padding = '15px 50px';
    messageContainer.style.borderRadius = '4px';
    messageContainer.style.boxShadow = '0 2px 12px 0 rgba(0, 0, 0, 0.1)';
    messageContainer.style.zIndex = '9999';
    messageContainer.style.transition = 'opacity 0.3s, transform 0.3s';
    messageContainer.style.opacity = '0';
    messageContainer.style.transform = 'translateX(-50%) translateY(-20px)';
    messageContainer.style.backgroundColor = '#f0f9eb';
    messageContainer.style.color = '#67c23a';

    // 创建消息文本元素
    const messageText = document.createElement('span');
    messageText.textContent = message;

    messageContainer.appendChild(messageText);
    document.body.appendChild(messageContainer);

    // 显示消息
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateX(-50%) translateY(0)';
    }, 50);

    // 自动关闭消息
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 300);
    }, duration);
}

export default mkAlert;