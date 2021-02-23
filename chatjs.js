        var readyButton = document.getElementById("ready-button")
        var customerState = document.getElementById("customer-state")
        var customerMessageInput = document.getElementById("message-input")
        var customerSendButton = document.getElementById("message-send")
        var customerMessages = document.getElementById("messagebox")
        var token;
        var channelSid;
        var myChannel;
        var getChat;

        // function getChat() {
        //     console.log("worked")
        //     const URL = 'https://chat.bankoff.org/api/token/generate?identity=';
        //     const FULL_URL = `${URL}'994552825540'`

        //     const ChatPromise = fetch(FULL_URL);
        //     return ChatPromise.then((response) => {
        //         return response.json();
        //     })

        // }

        // getChat();

        function readyButton() {

            fetch('https://chat.bankoff.org/api/token/generate?identity=994552825540', {
                method: 'POST'
            }).then(function(data) {
                data.json();
                token = data.token;
                channelSid = data.channelSid;
                Twilio.Chat.Client.create(token).then(function(client) {
                    client.getChannelBySid(channelSid).then(function(channel) {
                        myChannel = channel;
                        myChannel.join();
                        customerMessageInput.prop('disabled', false);
                        customerSendButton.prop('disabled', false);
                        myChannel.on('messageAdded', function(message) {
                            customerMessages.append(message.author + ' : ' + message.body + "<br>");
                        })
                    })
                });
            })
        };


        function SendButton() {
            myChannel.sendMessage(customerMessageInput.val())
            customerMessageInput.val("");
        };