#!/bin/bash sudo dpkg-reconfigure ca-certificates

sudo cp server.crt /etc/ca-certificates/trust-source/anchors/
sudo update-ca-trust