var phoneNumber = $('#customer-input');
var readyButton = $('#customer-ready-button');
var customerState = $('#customer-state');
var customerMessageInput = $('#customer-message-input');
var customerSendButton = $('#customer-send-button');
var customerMessages = $('#customer-messages');
var token;
var channelSid;
var device;
var myChannel;​
readyButton.click(function() {
    $.post('https://chat.bankoff.org/api/token/generate?identity=' + phoneNumber.val())
        .done(function(data) {
            token = data.token;
            channelSid = data.channelSid;
            Twilio.Chat.Client.create(token).then(function(client) {
                client.getChannelBySid(channelSid).then(function(channel) {
                    myChannel = channel;
                    myChannel.join();
                    // myChannel.getMessages().then(function(messages) {
                    //     let length = messages.items.length;
                    //     for (i = 0; i < length; i++) {
                    //         let message = messages.items[i];
                    //         customerMessages.append(message.author + ' : ' + message.body + "<br>");
                    //     }
                    // })
                    customerMessageInput.prop('disabled', false);
                    customerSendButton.prop('disabled', false);
                    myChannel.on('messageAdded', function(message) {
                        customerMessages.append(message.author + ' : ' + message.body + "<br>");
                    })
                })
            });
        })
        .fail(function(error) {
            customerState.val('Server not responding...');
        });
});​
customerSendButton.click(function() {
    myChannel.sendMessage(customerMessageInput.val())
    customerMessageInput.val("");
})