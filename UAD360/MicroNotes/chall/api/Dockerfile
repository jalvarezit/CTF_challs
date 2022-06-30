# syntax=docker/dockerfile:1
FROM alpine

RUN apk add --update gcc libc-dev

COPY readflag.c /

RUN gcc readflag.c -o /readflag

FROM docker.io/php:7.2-apache

# Create notes directory
ENV NOTES_DIR=/tmp/notes/
RUN mkdir $NOTES_DIR &&\
    chown www-data:www-data $NOTES_DIR

COPY src/ /var/www/html/

COPY flag /root/flag

COPY readflag.c /
RUN apt update && apt install -y gcc &&\
    gcc /readflag.c -o /readflag &&\
    rm /readflag.c  && chmod 755 /readflag &&\
    chmod +s /readflag && apt remove -y gcc

# Create git repo
RUN apt-get update &&\
    apt-get install -y git &&\
    cd /var/www/html && git init &&\
    git config --global user.email "MicroIT@local.com" &&\
    git config --global user.name "MicroIT" &&\
    git add . &&\
    git commit -m "Finally deployed >:P"
