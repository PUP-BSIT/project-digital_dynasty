<?php
session_start();
session_unset();
session_destroy();
echo "Logged out successfully";
header("Location: ../works/log_in_form.html"); 
exit();
?>
