<?php

declare(strict_types=1);

use DatabaseController as Controller;
use UserManager as UserManager;
use App\Entity\Notification as Notification;
class NotificationsManager
{

    /**
     *  @var Controller
     */
    private $controller;
    /**
     *  @var UserManager
     */
    private $userManager;

    public function __construct()
    {
        $this->controller = new Controller('mysql:host=localhost;dbname=beepspace', 'root', '');
        $this->userManager = new UserManager();
    }



    public function createNewNotification($user,$reciever,$date,$content,$addFriend){
        $typeNotif = "message";
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$user'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }

        if(!$userId){
            return "neexistuje zadaný uživatel";
        }

        $result = $this->controller->sql("SELECT id FROM users WHERE username='$reciever'");
        $recieverId = false;        
        foreach ($result as $row) {
            $recieverId = $row->id;
        }

        if(!$recieverId){
            return "neexistuje zadaný uživatel";
        }
        if($addFriend){
            $typeNotif = "add";
            $result = $this->controller->sql("SELECT * FROM notifications WHERE origin_id ='$userId' AND reciever_id='$recieverId' AND type='$typeNotif'");
            foreach($result as $row){
                return "already sended";
            }
        }
        
         $this->controller->sql("INSERT INTO notifications (content, date, type, origin_id,reciever_id) VALUES ('$content','$date','$typeNotif','$userId','$recieverId') ");
         return "sent";
        }


    public function getNotification($user){
        $returningArray = Array();
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$user'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }
        if(!$userId){
            return "neexistuje zadaný uživatel";
        }
        

        $result = $this->controller->sql("SELECT id,content,date,type,origin_id FROM notifications WHERE reciever_id = '$userId'");
        foreach($result as $row){
            
            
            array_push($returningArray,new Notification($row->id,$this->userManager->returnUserById($row->origin_id)->name,$user,$row->date,$row->content,$row->type));
        }

        return $returningArray;
    }



    public function confirmFriendRequest($user, $reciever,$id){
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$user'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }

        if(!$userId){
            return "neexistuje zadaný uživatel";
        }

        $result = $this->controller->sql("SELECT id FROM users WHERE username='$reciever'");
        $recieverId = false;        
        foreach ($result as $row) {
            $recieverId = $row->id;
        }

        if(!$recieverId){
            return "neexistuje zadaný příjemce";
        }

      

        if($this->userManager->addFriend($userId,$recieverId)){
            $this->removeNotificationByID($id);
            return "confirmed";
        }
        return "something went WRONG";


        
    }


    public function removeNotification($origin){
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$origin'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }
        if(!$userId){
            return "neexistuje zadaný uživatel";
        }
        
        $result = $this->controller->sql("DELETE FROM notifications WHERE origin_id = '$userId' AND type='message'");

    }

    public function removeNotificationByID($id):void{
         $this->controller->sql("DELETE FROM notifications WHERE id='$id'");
    }
    
}
