
import socket
import sys


HOST = '192.168.117.188' #"172.17.64.1"  # The server's hostname or IP address
PORT = 65432  # The port used by the server

input = sys.argv[1]
data_to_pass_back = "This is client message"


def sendToServer():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))
    s.sendall(data_to_pass_back.encode()) #b is important for some reason
    data = s.recv(1024)
    print('help')
    s.close()
    return (data.decode())

#output = sendToServer()
print(sendToServer())
sys.stdout.flush() #safety i think
