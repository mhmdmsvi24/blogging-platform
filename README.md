NULL

cheatsheet for me
| code | text                  | description                                                               |
| ---- | --------------------- | ------------------------------------------------------------------------- |
| 200  | OK                    | ✅ Standard response for successful GET or PUT request                     |
| 201  | Created               | ✅ Resource successfully created (e.g., after POST)                        |
| 204  | No Content            | ✅ Success with no response body (e.g., after DELETE or successful update) |
| 400  | Bad Request           | ❌ Invalid data from client (e.g., missing fields, bad JSON)               |
| 401  | Unauthorized          | ❌ User is not authenticated (e.g., missing/invalid token)                 |
| 403  | Forbidden             | ❌ Authenticated but not allowed to perform action                         |
| 404  | Not Found             | ❌ Resource not found (e.g., invalid ID or URL)                            |
| 409  | Conflict              | ❌ Duplicate resource, version conflict, etc.                              |
| 422  | Unprocessable Entity  | ❌ Semantically wrong input (e.g., failed validation, invalid format)      |
| 500  | Internal Server Error | ❌ Something broke on the server (use sparingly, with logs)                |

| Operation | Method    | Common Status Codes               |
| --------- | --------- | --------------------------------- |
| Create    | POST      | `201`, `400`, `422`               |
| Read      | GET       | `200`, `404`                      |
| Update    | PUT/PATCH | `200`, `204`, `400`, `404`, `422` |
| Delete    | DELETE    | `204`, `200`, `404`               |
