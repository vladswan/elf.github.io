<?php


    /*
     * Lead file
     */



    $fields = $_POST;
    //$txt = '';

    $token = "2141199814:AAEEv2lkmrR-2puAEu49UHAgNn0DnTDUvuw";
    $chat_id = "-1001504173658";


    if(!empty($fields['type'])){
        $txt = $fields['message'];
    }else{
        $txt = "✅ Заявка на заказ ELF BAR. Мое имя {$fields['your-name']}. Перезвоните мне пожалуйста на номер {$fields['your-phone']}.";
    }

    $data = [
        'text' => $txt,
        'chat_id' => $chat_id
    ];

    $sendToTelegram = file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );



    echo $sendToTelegram;












