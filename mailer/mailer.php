<?php
if (isset($_POST['submit'])) {
        $first_name = $_REQUEST['first_name'];
        $name = $_REQUEST['name'];
        $email = $_REQUEST['email'];
        $phone = $_REQUEST['phone'];
        $message = $_REQUEST['message'];

       $to = 'mymail@gmail.com';
       $subject = 'Contact Request From Website';
       $headers = "From: ".$name." <".$email."> \r\n";
       $headers .='Content-Type: text/html; charset="charset=UTF-8"'."\n";
       $send_email = mail($to,$subject,$message,$headers);
       if($send_email)
        {
          $response = ['status' => 'success'];
        }
        else
        {
          $response = ['status' => 'error'];
        }
       echo json_encode($response);    
  }

  ?>