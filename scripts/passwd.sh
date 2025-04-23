while IFS=: read u x nn rest; do if [ $nn -ge 1000 ]; then echo 'StrongPassw0rd!' | passwd --stdin $u; fi done < /etc/passwd
while IFS=: read u x nn rest; do if [ $nn -le 1000 ]; then passwd -l $u; fi done < /etc/passwd
