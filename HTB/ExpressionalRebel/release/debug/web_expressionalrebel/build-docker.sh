#!/bin/bash
docker rm -f web_expressionalrebel
docker build -t web_expressionalrebel . 
docker run --name=web_expressionalrebel --rm -p1337:1337 -it web_expressionalrebel
