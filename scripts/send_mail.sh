telnet <<EOF
OPEN localhost 25
EHLO odu.edu
MAIL FROM:<joel@odu.edu>
RCPT TO:<Y6ntDhujsu8@mail.harvey.desante.dev> NOTIFY=success,failure
DATA
Subject: Test Email

Hello World...
.
QUIT
quit
EOF