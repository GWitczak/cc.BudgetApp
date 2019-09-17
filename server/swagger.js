var swaggerDefinition = {
    info: {
        title: 'My budegt api',
        version: '1.0.0',
        description: 'Endpoints to test the user registration routes',
    },
    host: 'localhost:8000',
    basePath: '/',
    "tags": ["Users", "Transactions", "wallet"],
    "paths": {
        "/api/users": {
            "get": {
                "tags": ["Users"],
                "summary": "Returns a list of users.",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "wallet": {
                                    "type": "integer",
                                    "example": []
                                },
                                "globalBalance": {
                                    "type": "integer",
                                    "example": 1200
                                },
                                "history": {
                                    "type": "integer",
                                    "example": []
                                },
                                "isAdmin": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                },
                                "name": {
                                    "type": "string",
                                    "example": "Arthur Dent"
                                },
                                "email": {
                                    "type": "string",
                                    "example": "artur@cl.pl"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "$2b$10$QZvfdJYc1V5gEFhZpONdROGUQr8njg9FXE9rTU85OrLHbi.jttZxe"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Users"],
                "summary": "Creates a new user.",
                "parameters": [{

                }],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "example": "paw@op.pl"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "qwe123"
                                }
                            }
                        }
                    }
                }
            }

        },
        "/api/transactions": {
            "get": {
                "tags": ["Transactions"],
                "summary": "Returns a list of transactions for user.",
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "in": "x-auth-token",
                }],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "casrTransaction": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "cardOwner": {
                                    "type": "string",
                                    "example": null
                                },
                                "from": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                },
                                "date": {
                                    "type": "string",
                                    "example": "2019-09-15T13:32:56.000"
                                },
                                "accountType": {
                                    "type": "string",
                                    "example": "account"
                                },
                                "type": {
                                    "type": "string",
                                    "example": "inc"
                                },
                                "title": {
                                    "type": "string",
                                    "example": "Eloszka"
                                },
                                "amount": {
                                    "type": "integer",
                                    "example": 120
                                },
                                "category": {
                                    "type": "string",
                                    "example": "food"
                                },
                                "wallet_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Transactions"],
                "summary": "Creates new Transaction.",
                "parameters": [{}],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "casrTransaction": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "cardOwner": {
                                    "type": "string",
                                    "example": null
                                },
                                "from": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                },
                                "date": {
                                    "type": "string",
                                    "example": "2019-09-15T13:32:56.000"
                                },
                                "accountType": {
                                    "type": "string",
                                    "example": "account"
                                },
                                "type": {
                                    "type": "string",
                                    "example": "inc"
                                },
                                "title": {
                                    "type": "string",
                                    "example": "Eloszka"
                                },
                                "amount": {
                                    "type": "integer",
                                    "example": 120
                                },
                                "category": {
                                    "type": "string",
                                    "example": "food"
                                },
                                "wallet_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                }
                            }
                        }
                    }
                }
            }

        }, "/api/transactions/{id}": {
            "get": {
                "tags": ["Transactions"],
                "summary": "Returns a list of transactions for account. id = accountId",
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "in": "x-auth-token",
                }],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "casrTransaction": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "cardOwner": {
                                    "type": "string",
                                    "example": null
                                },
                                "from": {
                                    "type": "boolean",
                                    "example": false
                                },
                                "_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                },
                                "date": {
                                    "type": "string",
                                    "example": "2019-09-15T13:32:56.000"
                                },
                                "accountType": {
                                    "type": "string",
                                    "example": "account"
                                },
                                "type": {
                                    "type": "string",
                                    "example": "inc"
                                },
                                "title": {
                                    "type": "string",
                                    "example": "Eloszka"
                                },
                                "amount": {
                                    "type": "integer",
                                    "example": 120
                                },
                                "category": {
                                    "type": "string",
                                    "example": "food"
                                },
                                "wallet_id": {
                                    "type": "string",
                                    "example": "5d7bc1c38c31d13d57e63b4d"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/wallet/{id}": {
            "delete": {
                "tags": ["wallet"],
                "summary": "Delete wallet.",
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "in": "x-auth-token",
                }],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }

        },
        "/api/wallet/": {
            "post": {
                "tags": ["wallet"],
                "summary": "Creates a new wallet.",
                "parameters": [{}],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "example": "account"
                                },
                                "name": {
                                    "type": "string",
                                    "example": "Alior"
                                },
                                "balance": {
                                    "type": "iterer",
                                    "example": 1200
                                }
                            }
                        }
                    }
                }
            }

        }

    }

};

exports.swaggerDefinition = swaggerDefinition;