FROM node:current-buster-slim

# Install packages
RUN apt-get update \
    && apt-get install -y supervisor
    
# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY challenge .

# Install dependencies
RUN yarn

# Setup superivsord
COPY config/supervisord.conf /etc/supervisord.conf

# Set flag
ENV FLAG=HTB{b4cKtR4ck1ng_4Nd_P4rs3Rs_4r3_fuNnY}

# Expose the port node-js is reachable on
EXPOSE 1337

# Start the node-js application
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
