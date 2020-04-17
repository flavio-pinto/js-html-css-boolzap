$(document).ready(function () {
    // Refs
    var messageList = $('#messages-list');
    var messageBar = $('#msg-input');
    var sendMsgButton = $('.send-msg .fas.fa-paper-plane');
    var micButton = $('.send-msg .fas.fa-microphone');
    var textMsg = $('#template-message #my-message #text');

    // Creo script per barra invio testo
    messageBar.keyup(function(event) {
        if(event.which == 13) {
            var newMsg = messageBar.val().trim();

            if (newMsg !== '') {
                textMsg.prepend(newMsg);
                var sendNewMsg = $('#template-message li').clone();
                messageList.append(sendNewMsg);
                messageBar.val('');
                textMsg.text('');
            } else {
                alert('Non puoi inviare messaggio vuoto')
            }
        }
    });

    // Rendo funzionante pulsante invio col click
    messageBar.click(function() {
        micButton.addClass('d-none');
        sendMsgButton.removeClass('d-none');
    });

    

}); // end ready method