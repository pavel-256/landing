<?php

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['type'])) {
    // if we recieved data  from ajax and not empty
    $name = trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
    $email = trim(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL));
    $phone = trim(filter_var($_POST['phone'], FILTER_SANITIZE_STRING));
    $type = trim(filter_var($_POST['type'], FILTER_SANITIZE_STRING));
    $phoneRegExp = "/^0[2-9]\d{7,8}$/";
    // phone regular exprassions
    $type_kinds = ['basic', 'business', 'free'];
    // user canot choose somthing accept this in select opto=ion
    if (mb_strlen($name) > 1 && mb_strlen($name) < 70) {
        // if the name validated
        if ($email) {
            // if the email is validated
            if (preg_match($phoneRegExp, $phone)) {
                // if the phone validated
                if (in_array($type, $type_kinds)) {
                    // PDO method
                    $dbcon = 'mysql:host = localhost;dbname=eshop;charset=utf8';
                    $db = new PDO($dbcon, 'root', '');
                    $sql = "INSERT INTO contact_log VALUES(null, ?,?,?, NOW())";
                    $query = $db->prepare($sql);
                    // prepare to execution
                    if ($query->execute([$name, $email, $phone])) {
                        echo true; // execute also cleans sql injection
                    }
                }
            }
        }
    }

}
