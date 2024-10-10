# Test Task
### Description
This is a answer for test task. To check the test task, please run the bootstrap and then run the query by curl:
curl --location 'http://localhost:3005/api/eth/lastHundredMaxValue'

### Bootstrap
You will need the installed tools to run:
- NodeJS
- pnpm

Before starting, make sure that all the tools are prepared.

To launch the application, you need to do the following steps:
1. Copy the .env.example file to the same directory named .env and fill in the missing values;
2. Install dependencies: `pnpm i`;
3. Run the application with the command:
	`pnpm run start:dev`;

### Documentation
#### OpenAPI:
The OpenAPI documentation is generated automatically and is available after the application is launched at the url: http://$HOST:$PORT/api/docs/
When logging in, the browser will ask for the username/password specified in the file.env in variables: DOCS_USER and DOCS_PASS (see .env.example file)

### Stay in touch
Author - MoreWiktor
- Email - <morewiktor@yandex.ru> (Please add the line "sso.back". Email sorting is configured.)
- TG - [@MoreWiktor](https://t.me/morewiktor)
