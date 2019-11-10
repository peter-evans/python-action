#!/usr/bin/env python3

import os
import sys
import requests

message = sys.argv[1]
sender = sys.argv[2]

print("%s from %s" % (message, sender))

os.system('echo ::set-output name=reply::Hello %s!' % sender)
