# Sentrimetric API

Sentrimetric is an Express API that allows users to generate an API key and perform string analysis operations. It provides functionality to check the similarity between two strings, analyze the sentiment of a sentence, and determine if two words have the same phonetic sound.

## About the API

The Sentrimetric API allows users to generate an API key, which they can use to perform string analysis operations such as checking the similarity between two strings, analyzing the sentiment of a sentence, and determining if two words have the same phonetic sound.

The API follows RESTful principles and uses JSON for request and response payloads. Authentication is required for certain endpoints using an API key.

## Installation

To install and run the Sentrimetric API, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `pnpm install`

### Set Up Database

The Sentrimetric API requires a PostgreSQL database. You can use Docker to run a PostgreSQL container:

1. Install Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/).
2. Run the PostgreSQL container:

```
docker run --name postgres-container -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres
```

### Set Up Redis

The Sentrimetric API uses Redis for rate limiting. You can also use Docker to run a Redis container:

1. Install Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/).
2. Run the Redis container:

```
docker run --name redis-container -p 6379:6379 -d redis
```

3. Add the database link to the .env file

### Run Database Migrations

To sync the postgres database with the current prisma schema run the command

```
pnpm sync:db
```

This command also generates the prisma client

### Start the server

Start the server using this command

```
pnpm prod
```

The API server should now be running and accessible at `http://localhost:$PORT`.

Make sure to adjust the PostgreSQL and PORT details in the `.env` file if you are using custom configurations.

One notable addition to the project is the `zenv` function, which is used to verify and parse the schema file using Zod. This function ensures that the environment variables are properly defined and validated based on the specified schema.

## Dependencies

- [@prisma/client](https://www.npmjs.com/package/@prisma/client): Prisma client for working with databases.
- [argon2](https://www.npmjs.com/package/argon2): Password hashing library for secure storage of user passwords.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware for parsing cookies in Express.
- [dotenv](https://www.npmjs.com/package/dotenv): Module for loading environment variables from a `.env` file.
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [helmet](https://www.npmjs.com/package/helmet): Middleware for securing Express apps with various HTTP headers.
- [ioredis](https://www.npmjs.com/package/ioredis): Redis client for Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Library for generating and verifying JSON Web Tokens (JWT).
- [nanoid](https://www.npmjs.com/package/nanoid): Unique ID generator.
- [natural](https://www.npmjs.com/package/natural): Natural language processing library.
- [pino](https://www.npmjs.com/package/pino): Fast and opinionated logger for Node.js.
- [pino-pretty](https://www.npmjs.com/package/pino-pretty): Prettifier for Pino logs.
- [zod](https://www.npmjs.com/package/zod): TypeScript-first schema validation library.

## Dev Dependencies

- [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser): TypeScript definitions for cookie-parser.
- [@types/express](https://www.npmjs.com/package/@types/express): TypeScript definitions for Express.
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken): TypeScript definitions for jsonwebtoken.
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js.
- [prisma](https://www.npmjs.com/package/prisma): Database toolkit and ORM.
- [tsx](https://www.npmjs.com/package/tsx): TypeScript transpiler.
- [typescript](https://www.npmjs.com/package/typescript): JavaScript superset that provides static typing.

## Usage

To run the Sentrimetric API, you can use the following npm scripts:

- **Development Mode**

  - Run the API server in development mode with automatic restart on file changes:
    ```
    npm run dev
    ```

- **Production Mode**

  - Build the TypeScript code and start the API server in production mode:
    ```
    npm run prod
    ```

- **Synchronize Database**

  - Push database changes and generate Prisma client:
    ```
    npm run sync:db
    ```

- **Build**
  - Build the TypeScript code to the `dist` directory:
    ```
    npm run build
    ```

Make sure to set up your environment variables and configure the Prisma database connection before running the API. Refer to the "Installation" section for more details.

Once the API server is running, you can make HTTP requests to the specified endpoints using a tool like cURL, Postman, or your preferred API client.

Please note that certain endpoints require authentication using an API key. Ensure that you include the API key in the request headers or as specified in the API documentation.

## API Endpoints

### User Management

- **Create User**

  - `POST /api/users/`
  - Create a new user.

- **Delete User**
  - `DELETE /api/users`
  - Delete the current user.

### Session Management

- **Create Session (Login)**

  - `POST /api/sessions`
  - Create a new session (login) for the user.

- **Get information about current session**

  - `GET /api/sessions`
  - Get information about the current session.

- **Get all active sessions**

  - `GET /api/sessions/all`
  - Get information about all active sessions.

- **Logout from current session**

  - `DELETE /api/sessions/`
  - Logout from the current session.

- **Log out from all devices**
  - `DELETE /api/sessions/all`
  - Log out from all devices and terminate all sessions.

### API Key Management

- **Get Active API Key**

  - `GET /api/apikeys`
  - Get the active API key for the user.

- **Generate API Key**

  - `POST /api/apikeys`
  - Generate a new API key for the user.

- **Revoke API key**
  - `DELETE /api/apikeys`
  - Revoke the active API key for the user.

### Request Management

- **Get information about all requests made to the API**
  - `GET /api/requests`
  - Get information about all requests made to the API.

### String Analysis

- **Analyze how similar two texts are using Jaro-Winkler distance**

  - `POST /api/services/similarity`
  - Analyze the similarity between two texts using the Jaro-Winkler distance algorithm.

- **Analyze the sentiment of a given text**

  - `POST /api/services/sentiment`
  - Analyze the sentiment of a given text and return the sentiment score.

- **Check if two words are phonetically similar**
  - `POST /api/services/phonetics`
  - Check if two words are phonetically similar and return a boolean result.

## Contributing

Contributions are welcome! Here are the steps to contribute to the Sentrimetric API project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix-name`.
3. Commit your changes: `git commit -m 'Add some feature'` or `git commit -m 'Fix some bug'`.
4. Push to the branch: `git push origin feature/your-feature-name` or `git push origin bugfix/your-bug-fix-name`.
5. Submit a pull request to the `main` branch of the original repository.

Please make sure to update tests, if applicable, and adhere to the existing code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify this README.md file to fit your project's specific details and requirements.
