#APIkey API

Create API key

    POST /api/users/123/keys
    {
        "name": "myKeyName",
    }

Response

    {
        "key": "API_dGhpcyBpcyBlIHJhbmRvbSBzdHJpbmc",
        "name": "myKeyName"
    }

Remove API key

    DELETE /api/users/123/keys/name

Get all API keys

    GET /api/users/1223/keys
    [
        {
            name: 'myKeyName'
        }
    ]


#Login with key API

    POST /api/auth/login
    {
        apiKey: 'api12874623786473826483146936'
    }

response:

    {
        accessToken: '3847847837483787589437578439758943789578349758943759830'
        type: 'bearer'
    }

# Authenticate with token

Provide the token via the 'authentication' header

    POST /api/users
    Headers:
        Content-Type: application/json
        Authentication: bearer 384784783748378758943757843975894378957
