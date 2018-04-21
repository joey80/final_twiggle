<?php

/**
* upload_picture.php
*
* ADD SOME COOL FACTS ////////// NEED TO REFACTOR and MOVE to API->UTILS and control with AJAX
*/

require_once('dev/includes/init.php');
require_once('dev/includes/authInit.php');

// Upload and Rename File

if (isset($_POST['submit']))
{
    $filename = $_FILES["file"]["name"];
    $file_basename = substr($filename, 0, strripos($filename, '.')); // get file extention
    $file_ext = substr($filename, strripos($filename, '.')); // get file name
    $filesize = $_FILES["file"]["size"];
    $allowed_file_types = array('.jpg', '.JPG', '.png', '.PNG');

    

    if (in_array($file_ext,$allowed_file_types) && ($filesize < 200000))
    {   
        // Rename file
        $newfilename = md5($file_basename) . $file_ext;
        if (file_exists("public/uploads/" . $newfilename))
        {
            // file already exists error
            echo "You have already uploaded this file.";
        }
        else
        {   
            $user = User::getInstance()->getCurrentUser($userInfo);
            $user_id = $user->user_id;
            $url_to_uploads = 'public/uploads/';
            $userData = [
                'user_id' => $user_id,
                'picture' => $url_to_uploads . $newfilename
            ];

            $user->addProfilePicture($userData); 
            move_uploaded_file($_FILES["file"]["tmp_name"], "public/uploads/" . $newfilename);
            echo "File uploaded successfully.";     
        }
    }
    elseif (empty($file_basename))
    {   
        // file selection error
        echo "Please select a file to upload.";
    } 
    elseif ($filesize > 200000)
    {   
        // file size error
        echo "The file you are trying to upload is too large.";
    }
    else
    {
        // file type error
        echo "Only these file typs are allowed for upload: " . implode(', ',$allowed_file_types);
        unlink($_FILES["file"]["tmp_name"]);
    }
}

?>