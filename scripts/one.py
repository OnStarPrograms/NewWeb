import time
import subprocess

#insert ip
whitelist = []
autodeny = 0
timeoutTable = {}
prevIPs = set()

subprocess.run(["ip a > output.txt"], shell = True)
subprocess.run(["grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' output.txt  | grep -v '0.0.0.0'> newOutput.txt"], shell = True)
f = open("newOutput.txt", "r")
for ip in f.readlines():
    whitelist.append(ip)
print(whitelist)

for i in range(500):
    subprocess.run(['ss -n> output.txt'], shell = True)
    subprocess.run(["grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' output.txt  | grep -v '0.0.0.0'> newOutput.txt"], shell = True)
    f = open("newOutput.txt", "r")
    # print(f.readlines())
    for ip in f.readlines():
        if (ip not in timeoutTable and ip not in whitelist):
            print("ip not known")
            timeoutTable.update({ip:time.time()});
            prevIPs.add(ip)
        if (ip not in whitelist):
            print(ip[0:-1], "is connected for", time.time() - timeoutTable.get(ip))
            if (time.time() - timeoutTable.get(ip) > 5):
                #run blocker
                print("blocking ip:", ip)
                timeoutTable[ip] = time.time()
                subprocess.run(['iptables -A INPUT -s '+ip[0:-1]+' -j DROP'], shell = True)
    for ips in prevIPs:
        if ips not in f.readlines():
            timeoutTable[ips] = time.time()

print(whitelist)
