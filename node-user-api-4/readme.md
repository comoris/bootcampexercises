# Node Exercise - UserAPI - Authentication

## Add a REST API to add APIKeys.

Features:

* A user can have one or more API Keys.
* During creation the APIKey should only be displayed once to the user.
* An API Key should be named.
* The APIKey should be stored in the DB with a one way SHA265 encryption.
* An APIKey can be removed but cannot be updated.

API Key (is generated randomly)

    API_dGhpcyBpcyBlIHJhbmRvbSBzdHJpbmc=

Use following random generator

    npm install secure-random-string --save

DB Document

    {
        "_id" : ObjectId(...),
        "firstName":"Peter",
        "lastName":"Cosemans",
        "age": 50,
        "email":"peter.cosemans@euri.com",
        "homeAddress": {
            "addressLine": "Paul Van Ostaijenlaan 1",
            "city": "Lint",
            "zip": "B2547"
        },
        "apiKeys": [
            {
                "name": "app1"
                "encryptedKey": "<base64encodedstring>"
            },
            {
                "name": "app2"
                "encryptedKey": "<base64encodedstring>"
            }
        ]
    }

## Add an authenticate API that accept an APIKey and returns an JWT token response.

ToDo:

* Encrypt the provided APIKey with the one way SHA265 encryption
* Get a user based on the encrypted APIKey, for the db query see
http://docs.mongodb.org/manual/reference/operator/query/elemMatch/
* Create the payload of the token.

Token payload:

    {
        "sub": 12242344,
        "iat": 1232312,
        "iis": "euri:bootcamp",
        "name": "<name of the user>",
        "userId": "<id of the user>"
    }

* Create a token based on a secret and the payload.
http://www.sitepoint.com/using-json-web-tokens-node-js/
https://www.npmjs.com/package/jwt-simple

* And return the token

Response:

    {
        "accessToken": "<jwt access token>"
        "tokenType": "bearer"
    }

You can verify your token with: http://jwt.io

## Add JWT token based authentication.

Features:

* POST, PUT and DELETE should require token based authentication
* When not authenticated (no or invalid token) a 401 error should be returned.
* The JWT Token should be validated
