import socket
from datetime import datetime
import time
import subprocess
import requests


def scanning_port (targeted_ip,port):
    try:
        # Creating a socket object and stting the timeout
        sock=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        sock.settimeout(0.5)

        # We try to connect to target the IP and port 
        result=sock.connect_ex((targeted_ip,port))


        if result==0 :
            user = input(f"PORT {port} is OPEN is that ok (y/n)? ")
            if (user != "y"):
                subprocess.run(['New-NetFirewallRule -DisplayName "block Port '+port+'" -Direction inbound -Profile Any -Action Block -LocalPort '+port+' -Protocol UDP'], shell = True)
                subprocess.run(['New-NetFirewallRule -DisplayName "block TCP Port '+port+'" -Direction inbound -Profile Any -Action Block -LocalPort '+port+' -Protocol TCP'], shell = True)
                subprocess.run(['Enable-NetFirewallRule -DisplayName "block Port '+port+'"'], shell = True)
                subprocess.run(['Enable-NetFirewallRule -DisplayName "block TCP Port '+port+'"'], shell = True)
            



        sock.close()# Close the socket after the connection attempt 
    
    except socket.error:  
        print(f"Couldn't connect to {targeted_ip} on PORT {port}")
        return
    


def scan_ports (target_ip,start_port,end_port):
    print(f"Starting The Scanning to {target_ip} at {datetime.now()}")

    for port in range(start_port,end_port+1):
         scanning_port(target_ip, port)
    

whitelist = []
autodeny = 0
timeoutTable = {}
prevIPs = set()

f = open("output.txt", "r")
for ip in f.readlines():
    whitelist.append(ip)
print(whitelist)
for i in whitelist:
    if i != "" and i[0:3] != "127":
        scan_ports(i, 0, 65535)

        

