# Node Exercise - UserAPI

Create a API to manage (CRUD) a user.

### User db model

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
        }
    }

### API

#### GET /api/users

Response:

    [
        {
            "id": "32132422",
            "name": "Peter Cosemans",
            "age": 50,
            "email": "peter.cosemans@gmail.com",
            "address": "Paul Van Ostayenlaan 1",
            "city": "Lint",
            "zip": "B2547"
        }
    ]

Status Codes:

* 200: OK

#### GET /api/users/32132422

Response:

        {
            "id": "32132422",
            "name": "Peter Cosemans",
            "age": 50,
            "email": "peter.cosemans@gmail.com",
            "address": "Paul Van Ostayenlaan 1",
            "city": "Lint",
            "zip": "B2547"
        }

Status Codes:

* 200: OK
* 404: Not Found

#### POST /api/users

Request with mandatory fields

    {
        "name": "Peter Cosemans",
        "email": "peter.cosemans@gmail.com",
    }

Request with all fields

    {
        "name": "Peter Cosemans",
        "age": 50,
        "email": "peter.cosemans@gmail.com",
        "address": "Paul Van Ostayenlaan 1",
        "city": "Lint",
        "zip": "B2547"
    }

Response:

    {
        "id": "32132422",
        "name": "Peter Cosemans",
        "age": 50,
        "email": "peter.cosemans@gmail.com",
        "address": "Paul Van Ostayenlaan 1",
        "city": "Lint",
        "zip": "B2547"
    }

Response Header:

    Location: http://localhost:3000/api/users/32132422

Status Codes:

* 201: Created
* 400: Bad Request

#### PUT /api/users/32132422

Request with mandatory fields

    {
        "name": "Peter Cosemans",
        "email": "peter.cosemans@gmail.com",
    }

Request with all fields

    {
        "name": "Peter Cosemans",
        "age": 50,
        "email": "peter.cosemans@gmail.com",
        "address": "Paul Van Ostayenlaan 1",
        "city": "Lint",
        "zip": "B2547"
    }

Response:

    {
        "id": "32132422",
        "name": "Peter Cosemans",
        "age": 50,
        "email": "peter.cosemans@gmail.com",
        "address": "Paul Van Ostayenlaan 1",
        "city": "Lint",
        "zip": "B2547"
    }

Status Codes:

* 200: OK
* 400: Bad Request
* 404: Not Found

#### DELETE /api/users/32132422

Response (the resouce that is deleted):

    {
        "id": "32132422",
        "name": "Peter Cosemans",
        "age": 50,
        "email": "peter.cosemans@gmail.com",
        "address": "Paul Van Ostayenlaan 1",
        "city": "Lint",
        "zip": "B2547"
    }

Status Codes:

* 200: OK
* 204: No Content (in case the resource was not found)

---

#### Global error codes

    200     OK                  Success
    201     Created

    400     Bad Request         The request was invalid or cannot be otherwise
                                served. An accompanying error message will explain details.

    401     Unauthorized        Authentication credentials were missing or
                                incorrect.

    404     Not Found           The URI requested is invalid or the resource
                                requested, such as a user, does not exists.

    405     Method Not Allowed  The method; POST, GET or DELETE is not allowed
                                for this resource.

    500     Internal Server     Something is broken at the server.
            Error

#### Error object

General

    {
        "code": "Not Found",
        "message": "The requested resource was not found"
    }

Bad request

    {
        "code": "Bad Request",
        "message": "One or more input validation is invalid"
        "errors": [
            { "key": "name", "message": "may not be empty"}
            { "key": "email", "message": "not a well-formatted email address"}
        ]
    }

Internal Server Error

    {
        "code": "InternalServerError",
        "message": "Oops! something went wrong!"
        "details": "<detailed error message, only in development>"
    }

General errors:

* When a resource is not found/available: 404 - Not Found
* When a method is not allowed on the resource: 405 - Method Not Allowed
* When the server has an unhandled error/exception: 500 - Internal Server Error

