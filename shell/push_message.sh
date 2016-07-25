#!/bin/bash

# get SLACK_WEBHOOK_URL env var
source $(dirname $0)/env_var.sh

# git user info
email=`git config --global user.email`
name=`git config --global user.name`
avatar=$(bash $(dirname $0)/gravatar.sh $email)

payload='payload={"attachments": [ {"author_name": "'"$name"'","author_icon": "'"$avatar"'", "color": "good",  "text": "Trigger build docker image scessus."} ]}'
slackReturn=$(curl -s -X POST --data-urlencode "$payload" "$SLACK_WEBHOOK_URL")

echo $slackReturn

## test use
# email=`git config --global user.email`
# avatar=$(bash $(dirname $0)/gravatar.sh $email)
# echo $avatar
# slackReturn=$(curl -s -X POST --data-urlencode 'payload={"attachments": [ {"author_name": "Alex","author_icon": "'"$email"'"} ]}' "$SLACK_WEBHOOK_URL")
# echo $slackReturn
