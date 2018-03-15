# Devlog API

## index
- /sign
    - `POST /`
- /users
    - `POST /`
    - `GET /{userId}`
    - `GET /`
    - `PUT /{userId}`
    - `DELETE /{userId}`
- /posts
    - `POST /`
    - `GET /{postId}`
    - `GET /`
    - `PUT /{postId}`
    - `DELETE /{postId}`
- /comments
    - `POST /{postId}`
    - `GET /{commentId}`
    - `GET /`
    - `PUT /{commentId}`
    - `DELETE /{commentId}`
- /mypages
    - `GET /me`
    - `GET /followings-posts`
    - `GET /liked-posts`
    - `GET /commented-posts`
    - `GET /my-posts`
- /follows
    - `POST /`
    - `DELETE /`
- /uploads
    - `POST /thumbnail`
- /search
    - `GET /users`

## `POST /sign`

### request

```http
request body
    email: email@example.com
    password: Asdf!234
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "token":  "eyJhbGciOiJIUzI1NiIsIn..."
}
```
- on failure

```json
{
    "message": "INVALID_EMAIL_OR_PASSWORD"
}
```

## `POST /users`

### request

```http
request body
    username: 유저이름
    email: email@example.com
    password: Asdf!234
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "user": {
        "username": "TestId1",
        "email": "test1@gmail.com",
        "followers": [],
        "followings": [],
        "_id": "5aa8c826eea4b...",
        "createdAt": "2018-03-14T06:58:46.327Z",
        "updatedAt": "2018-03-14T06:58:46.327Z"
    }
}
```

- on failure

```json
{
    "message": "EMAIL_ALREADY_EXIST"
}
```

## `GET /users/{userId}`

### request

```http
request params
    userId: 5aa8c3b5062cd...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "user": {
        "followers": [],
        "followings": [],
        "_id": "5aa8c3b5062cd...",
        "username": "TestId1",
        "email": "test1@gmail.com",
        "createdAt": "2018-03-14T06:39:49.315Z",
        "updatedAt": "2018-03-14T06:39:49.315Z"
    }
}
```

- on failure

```json
{
    "message": "USER_NOT_FOUND"
}
```

## `GET /users`

### request

```http
request queries
    limit: 10
    offset: 0
    by: property
    q: value
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "users": [
        {
            "followers": [],
            "followings": [],
            "_id": "5aa8c826eea4b2...",
            "username": "TestId5",
            "email": "test5@gmail.com",
            "createdAt": "2018-03-14T06:58:46.327Z",
            "updatedAt": "2018-03-14T06:58:46.327Z"
        }
    ]
}
```

- on failure

```json
{
    "message": "BY_OR_Q_NOT_EXIST"
}
```

## `PUT /users/{userId}`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...
request params
    userId: 5aa8c3b5062cd...
request body
    username: 유저이름
    email: email@example.com
    password: Asdf!234
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "result": {
        "followers": [],
        "followings": [],
        "_id": "5aa8c3b5062cd8...",
        "username": "TestId1",
        "email": "test1@gmail.com",
        "createdAt": "2018-03-14T06:39:49.315Z",
        "updatedAt": "2018-03-14T08:58:13.339Z"
    }
}
```

- on failure

```json
{
    "message": "EMAIL_ALREADY_EXIST"
}
```

## `DELETE /users/{userId}`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5c...
request params
    userId: 5aa8c3b5062cd8...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "result": {
        "followers": [],
        "followings": [],
        "_id": "5aa8c3b5062cd8f...",
        "username": "TestId1",
        "email": "test1@gmail.com",
        "createdAt": "2018-03-14T06:39:49.315Z",
        "updatedAt": "2018-03-14T08:58:13.339Z"
    }
}
```

- on failure

```json
{
    "message": "USER_NOT_FOUND"
}
```

## `POST /posts`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5c...
request body
    content: This is content of post...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "post": {
        "content": "This is test #post yeah!",
        "hashtags": [
            "#post"
        ],
        "author": "5aa8c788e497c...",
        "comments": [],
        "goods": [],
        "_id": "5aa8ea813e869...",
        "createdAt": "2018-03-14T09:25:21.953Z",
        "updatedAt": "2018-03-14T09:25:21.953Z"
    }
}
```

- on failure

```json
{
    "message": "INVALID_CONTENT"
}
```

## `GET /posts/{postId}`

### request

```http
request params
    postId: 5aa8ebe13e869d...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "post": {
        "hashtags": [
            "#post"
        ],
        "comments": [],
        "goods": [],
        "_id": "5aa8ebe13e869d...",
        "content": "this is test #post yeah!@!",
        "author": {
            "followers": [],
            "followings": [],
            "_id": "5aa8c788e497c9...",
            "username": "TestId3",
            "email": "test3@gmail.com",
            "createdAt": "2018-03-14T06:56:08.805Z",
            "updatedAt": "2018-03-14T06:56:08.805Z"
        },
        "createdAt": "2018-03-14T09:31:13.435Z",
        "updatedAt": "2018-03-14T09:31:13.435Z"
    }
}
```

- on failure

```json
{
    "message": "POST_NOT_FOUND"
}
```

## `GET /posts`

### request

```http
request queries
    limit: 10
    offset: 0
    by: hashtags
    q: post
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "posts": [
        {
            "hashtags": [
                "#post"
            ],
            "comments": [],
            "goods": [],
            "_id": "5aa8ebe13e869d0...",
            "content": "this is test #post yeah!@!",
            "author": {
                "followers": [],
                "followings": [],
                "_id": "5aa8c788e497c9f...",
                "username": "TestId3",
                "email": "test3@gmail.com",
                "createdAt": "2018-03-14T06:56:08.805Z",
                "updatedAt": "2018-03-14T06:56:08.805Z"
            },
            "createdAt": "2018-03-14T09:31:13.435Z",
            "updatedAt": "2018-03-14T09:31:13.435Z"
        }
    ]
}
```

- on failure

```json
{
    "message": "BY_OR_Q_NOT_EXIST"
}
```

## `PUT /posts/{postId}`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...
request params
    postId: 5aa8c3b5062cd...
request body
    content: This is content ....
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "result": {
        "hashtags": [
            "#comment"
        ],
        "comments": [],
        "goods": [],
        "_id": "5aa8ebe13e869d01...",
        "content": "this is test #comment yeah!@!",
        "author": "5aa8c788e497c9fa...",
        "createdAt": "2018-03-14T09:31:13.435Z",
        "updatedAt": "2018-03-14T09:45:08.467Z"
    }
}
```

- on failure

```json
{
    "message": "POST_NOT_FOUND"
}
```

## `DELETE /posts/{postId}`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...
request params
    postId: 5aa8c3b5062cd...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "result": {
        "hashtags": [
            "#comment"
        ],
        "comments": [],
        "goods": [],
        "_id": "5aa8ebe13e869d0...",
        "content": "this is test #comment yeah!@!",
        "author": "5aa8c788e497c9f...",
        "createdAt": "2018-03-14T09:31:13.435Z",
        "updatedAt": "2018-03-14T09:45:08.467Z"
    }
}
```

- on failure

```json
{
    "message": "POST_NOT_FOUND"
}
```

## `POST /comments/{postId}`

### request

```http
request headers
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...
request params
    postId: 5aa8c3b5062cd...
request body
    content: Yeah! comment! ...
```

### response

- on success

```json
{
    "message": "SUCCESS",
    "comment": {
        "post": "5aa9535a3df4060...",
        "author": "5aa8c6f56cd7f5fa...",
        "content": "yeah this is commentasdf",
        "createdAt": "2018-03-14T17:14:16.822Z",
        "goods": [],
        "_id": "5aa9586833e858...",
        "updatedAt": "2018-03-14T17:14:16.822Z"
    }
}
```

- on failure

```json
{
    "message": "POST_NOT_FOUND"
}
```