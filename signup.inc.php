<?php
if(isset($_POST['Submit'])){
  //temporary removal of MySQL database
  //include_once 'database/db_connect.php';

  $uname=mysqli_real_escape_string($con,$_POST['username']);
  $team=mysqli_real_escape_string($con,$_POST['teammates']);
  $email=mysqli_real_escape_string($con,$_POST['email']);
  $insta=mysqli_real_escape_string($con,$_POST['insta']);
  $phone=mysqli_real_escape_string($con,$_POST['phone']);
  $payphone=mysqli_real_escape_string($con,$_POST['payphone']);
  $screenshot=mysqli_real_escape_string($con,$_POST['screenshot']);
  $isSquad=mysqli_real_escape_string($con,$_POST['squad-checkbox']);
//  echo $uname." ".$team." ".$isSquad;
/*
  $sql="SELECT * FROM registrations WHERE username='$uname'";
                $result = mysqli_query($con,$sql);
                $resultCheck = mysqli_num_rows($result);

                if($resultCheck > 0){
                  header("Location:signup.php?reg=0");
                  exit();
                }
                else{*/
                  //insert the registration into database
                  //comment out the below code if mysql is required
                 /* $sql1 = "INSERT INTO registrations (username, team, email, insta, phone, payphone, isSquad, screenshot) VALUES ('$uname','$team','$email','$insta','$phone','$payphone','$isSquad','$screenshot')";
                  echo $sql1;
                  $res=mysqli_query($con,$sql1);
                */


                  //make a csv file for the cuurent date. eg:19-08-2018_SQUAD.csv and read number of lines
                  $row=0;
                  $file="Reg_Data/".date('d-m-y')."_".$isSquad.".csv";
                  if (($fp = fopen($file, "c+")) !== FALSE) {
                      while (($record = fgetcsv($fp)) !== FALSE) {
                                $row++;
                              }
                      }

                      //if rows greater then 0 then add the registration to bottom of csv file
                  if($row>0){
                    $list = array
                    (
                      $uname.",".$team.",".$email.",".$insta.",".$phone.",".$payphone.",".$isSquad.",".$screenshot,
                    );
                  $handle = fopen($file, "a+");
                    foreach ($list as $line){
                          fputcsv($handle,explode(',',$line));
                      }
                    fclose($handle);
                  }
                  //if rows are zero, i.e csv file is empty add headers and append the registration data to next line
                  else if($row==0){
                    $list = array
                    (
                      "uname,team,email,insta,phone,payphone,isSquad,screenshot",
                      $uname.",".$team.",".$email.",".$insta.",".$phone.",".$payphone.",".$isSquad.",".$screenshot,
                    );
                    $handle = fopen($file, "a+");
                    foreach ($list as $line){
                          fputcsv($handle,explode(',',$line));
                      }
                    fclose($handle);
                  }

                header("Location:signup.html");
                  exit();

 }
 ?>
