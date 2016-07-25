#!/bin/bash

# Given an email, get the associated gravatar

EMAIL=$1

# Size in pixels you want, must be less than 512
SIZE='256'
HASH=`echo -n $EMAIL | awk '{print tolower($0)}' | tr -d '\n ' | md5sum --text | tr -d '\- '`
URL="http://www.gravatar.com/avatar/$HASH?s=$SIZE&d=404"

echo $URL

# https://gist.github.com/icco/867524
