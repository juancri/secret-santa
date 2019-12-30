# secret-santa
Secret santa sends email message to everyone using AWS SES

## Getting started

### Requirements

- Node 12.x
- Gulp (```npm install -g gulp```)

### Install dependencies

Run ```npm install```

### Configure

- Run ```cp config.json.sample config.json``` and edit the config.json file
- Create the AWS credentials file (~/.aws/credentials). More information [here](http://aws.amazon.com/developers/getting-started/nodejs/).

### Build

Execute ```gulp```


### Run

Execute ```node dist/run.js```


## Remarks

Please note that if you want to send email to email addresses that are not verified for your account, you should request AWS to increase the limit for your account. More information [here](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/limits.html).
