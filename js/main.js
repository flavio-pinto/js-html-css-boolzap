/**
 * Milestone 1
 * Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi stilati e posizionati diversamente in base a: messaggio  dall’utente (verdi) e messaggio dall’interlocutore (bianco) assegnando due classi CSS diverse
 * Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
 * Messaggi visibili inizialmente sono inseriti statici nell’HTML
 * Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS
 * Milestone 2
 * Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
 * Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
 * Ricordate che c’è un metodo includes()  anche per le stringhe oltre che per gli array.
 * Mileston 3 (opzionale)
 * Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire nuovi messaggi per ogni conversazione
 * Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
 */

$(document).ready(function () {
    // Creo Referenze
    var searchBar = $('#search');
    var conversation = $('.sidebar-select-chat li');
    var friendName = $('.friend-name');
    var messageList = $('#messages-list.dflex');
    var messageBar = $('#msg-input');
    var chatButton = $('.send-msg .fas.fa-microphone');
    var templateTxt = $('.template-message .message .text');
    var templateTime = $('.template-message .message .time');
    var templateMsg = $('.template-message li');

    // Consentire selezione chat
    conversation.click(function() {
        $(this).children().addClass('active');
        $(this).siblings().children().removeClass('active');
        var msgData = $(this).attr('data-conversation');
        // reset
        $('#messages-list.dflex').removeClass('dflex');
        // Show active
        $('#messages-list[data-conversation="' + msgData + '"]').addClass('dflex');
        messageList = $('#messages-list.dflex');
    });

    // Rendo il pulsante aeroplanino funzionante
    chatButton.click(newMessage);

    // Creo variabile messaggio bot
    var botMsg;

    // Creo variabile per cambio icona
    var changeChatButton;
    
    // Eventi e condizioni per far sì che il messaggio venga inviato e l'icona cambi o meno
    messageBar.keyup(function(event) {
        if((event.which == 13) && (messageBar.val() !== null) && (messageBar.val().trim() !== '')) {
            newMessage();
            changeChatButton = false;

            // Messaggio bot
            botMsg = setTimeout(function(){
                generateBotMsg();
            }, 1000);
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

        $('body').on('focus blur', '#msg-input', function() {
            chatButton.removeClass('fa-microphone').addClass('fa-paper-plane');
            chatButton.removeClass('fa-paper-plane').addClass('fa-microphone');
        });
    });

    // Rendere funzionante la barra di ricerca delle conversazioni
    searchBar.keyup(function() {
        hideWhenSearch($(this).val());
    });

    // Attivare dropdown menu per i messaggi
    var dropDown = $('#messages-list .message .msg-dropdown-menu');
    var dropDownButton = $('#messages-list .message i')
    dropDownButton.click(function() {
        var activeDropDownMenu = $(this).parent().children(dropDown);
        // $(this).parent().children(dropDown).toggleClass('active-menu');
        dropDown.not(activeDropDownMenu).removeClass('active-menu');
        activeDropDownMenu.toggleClass('active-menu');
    });

    // Rendere funzionante pulsante "Cancella messaggio"
    var deleteMsg = $('#messages-list .message .msg-dropdown-menu li:last-child');
    deleteMsg.click(function() {
        $(this).parent().parent().remove();
    });

    // Far scomparire dropdown menu al click in qualsiasi altro punto della web app
    dropDownButton.click(function(event) {
        event.stopPropagation();
    });

    $('#app').click(function(e) {
        if(dropDownButton !== e.target && !dropDownButton.has(e.target).length) {
            dropDown.removeClass('active-menu');
        }
    });


    // FUNZIONI
    // Creo funzione per permettere di clonare il template, inserire il testo desiderato e aggiungerlo all'area messaggi
    function newMessage() {
        var getText = messageBar.val().trim();
        templateMsg.addClass('sent');
        templateTxt.prepend(getText);
        templateTime.prepend(getTime);
        var updatedTemplate = templateMsg.clone();
        messageList.append(updatedTemplate);
        messageBar.val('');
        templateTxt.text('');
        templateTime.text('');
        autoScrollDown();
    }

    // Funzione messaggio bot
    function generateBotMsg() {
        var msgBot = templateMsg.addClass('received');
        var botTxt = templateTxt.text('ok');
        templateTime.prepend(getTime);
        var updatedMsgBot = msgBot.clone();
        messageList.append(updatedMsgBot);
        botTxt.text('');
        msgBot.removeClass('received');
        templateTime.text('');
        autoScrollDown();
    }

    // Funzione orario
    function getTime() {
        var date = new Date();
        var h = addZero(date.getHours());
        var min = addZero(date.getMinutes());
        var time = h + ':' + min;
        return time;
    }

    // Funzione per ggiungere zero in caso nell'orario è presente un numero a una cifra
    function addZero(number) {
        if(number < 10) {
            number = '0' + number;
        }
        return number;
    }

    // Funzione per nascondere elementi non corrispondenti alla ricerca
    function hideWhenSearch(e) {
        conversation.each(function() {
            var found = false;
            $(this).each(function() {
                if($(this).find(friendName).text().toLowerCase().indexOf(e.toLowerCase()) >= 0) {
                    found = true;
                }
            });
            
            if(found == true) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Funzione per scroll automatico in basso
    function autoScrollDown() {
        var autoScroll = messageList.height();
        $('.messages-area').animate({
            scrollTop: autoScroll
        }, 1);
    }
}); // end ready method