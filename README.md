<h1 align="center">Forum API</h1>

# Table of Contents
* [Built With](#built-with)
  * [Tech Stack](#tech-stack)
  * [Key Features](#key-features)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
  * [Usage](#usage)
  * [Test](#test)
* [Author](#author)

## Built With
### Tech Stack
<details>
  <summary>Server</summary>
  Node.js with Hapi framework
</details>
<details>
  <summary>Database</summary>
  Postgresql
</details>

## Getting Started
To get a local copy up and running, follow these steps.
### Prerequisites
In order to run this project you need:
- node >= 14.0
- postgres >= 15.3

### Setup
1. Clone this repository
```
git clone https://github.com/regysaputra/forum-api.git
```
2. Create environment file

&emsp;&emsp;.env
```
# HTTP SERVER  
HOST=0.0.0.0
PORT=8000

# POSTGRES CONNECTION STRING
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/forumapi

# TOKENIZE
ACCESS_TOKEN_KEY=8b7b4ef375716ab08b2a3951b29d52fc00b1c855f9d1a847229b8c5935bef56d9d271e76a9cf08e614300395c3b90ebe559cf968a0741b18c9505549394b2c70
REFRESH_TOKEN_KEY=5078605e074a462b1460608fcbe0d0963c644402e04ad334455ff5a856cb43fd99825861dde02957d5e3184c90c532ca7d0249df20fe93d535632f3d11be7bad
```
  
&emsp;&emsp;.test.env
```
# POSTGRES CONNECTION STRING
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/forumapi_test

# TOKENIZE
ACCESS_TOKEN_KEY=8b7b4ef375716ab08b2a3951b29d52fc00b1c855f9d1a847229b8c5935bef56d9d271e76a9cf08e614300395c3b90ebe559cf968a0741b18c9505549394b2c70
REFRESH_TOKEN_KEY=5078605e074a462b1460608fcbe0d0963c644402e04ad334455ff5a856cb43fd99825861dde02957d5e3184c90c532ca7d0249df20fe93d535632f3d11be7bad
```  
&emsp;&emsp;.development.env
```  
# HTTP SERVER
HOST=localhost
PORT=8000

# POSTGRES CONNECTION STRING
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/forumapi

# TOKENIZE
ACCESS_TOKEN_KEY=8b7b4ef375716ab08b2a3951b29d52fc00b1c855f9d1a847229b8c5935bef56d9d271e76a9cf08e614300395c3b90ebe559cf968a0741b18c9505549394b2c70
REFRESH_TOKEN_KEY=5078605e074a462b1460608fcbe0d0963c644402e04ad334455ff5a856cb43fd99825861dde02957d5e3184c90c532ca7d0249df20fe93d535632f3d11be7bad
```
3. Create database forumapi and forumapi_test in postgres

4. Install dependencies
```
npm install
```
5. Migrate database
```
npm run migrate:dev
npm run migrate:test
npm run migrate:prod
```

### Usage
Start the application by running this command:
```
npm run start
```
It will run the server on http://localhost:8000

### Test
To run test in this application
```
npm run test
```
It will run the all the unit test and integration of these project

## Author
#### Regy Saputra
* Github: https://github.com/regysaputra
* Twitter: @regysaputra27
* Linkedin: Regy Saputra

