<?php
session_start();
session_unset();
session_destroy();
header("Location: ../works/log_in_form.html");
exit();
?>
