$(document).ready(function () {
    // Creo Referenze
    var messageList = $('#messages-list');
    var messageBar = $('#msg-input');
    var chatButton = $('.send-msg .fas.fa-microphone');
    var templateTxt = $('.template-message .message.sent .text');
    var templateMsg = $('.template-message li');

    // Rendo il pulsante aeroplanino funzionante
    chatButton.click(newMessage);

    // Creo variabile per cambio icona
    var changeChatButton;
    
    // Eventi e condizioni per far sì che il messaggio venga inviato e l'icona cambi o meno
    messageBar.keyup(function(event) {
        if((event.which == 13) && (messageBar.val() !== null) && (messageBar.val().trim() !== '')) {
            newMessage();
            changeChatButton = false;
        } else if ((event.which > 47 && event.which < 58) || // numeri
        (event.which > 64 && event.which < 91) || // lettere
        (event.which > 95 && event.which < 112) || // numeri del numpad
        (event.which > 185 && event.which < 193) || // punteggiatura
        (event.which > 218 && event.which < 223)) { // altra punteggiatura
            changeChatButton = true;
        } else if (messageBar.val() == null || messageBar.val().trim() == '') {
            messageBar.val('');
            changeChatButton = false;
        } else {
            changeChatButton = false;
        }

        if(changeChatButton == true) {
            chatButton.removeClass('fa-microphone').addClass('fa-paper-plane');
        } else if(changeChatButton == false && messageBar.val() == null || messageBar.val().trim() == '') {
            chatButton.removeClass('fa-paper-plane').addClass('fa-microphone');
        }
    });

    // Creo funzione per permettere di clonare il template, inserire il testo desiderato e aggiungerlo all'area messaggi
    function newMessage() {
        var getText = messageBar.val().trim();
        templateTxt.prepend(getText);
        var updatedTemplate = templateMsg.clone();
        messageList.append(updatedTemplate);
        messageBar.val('');
        templateTxt.text('');
    }
}); // end ready method