# Backend Assessment - Blog Posts:

### Summary:

- This api was created to complete the backend assessment by Hatchways.
- API logic is contained in index.js
- Tests are contained in test.js

### API dependencies:

```
    axios: ^0.26.0,
    chai: ^4.3.6,
    express: ^4.17.3,
    request: ^2.88.2
```

### Steps to run API

- In the terminal and within the project directory run `npm install` to install all project dependencies
- This server will run on `PORT:3000`
- Run `npm start` to start the server, which will be at `localhost:3000`
- Run `npm test` ONLY after server terminal logs message `Server is running on port 3000` for the previous step, to run mocha/chai tests on server endpoints
- Query params can be added to request using `Postman` or any other api testing client
- Optionally the following URL can be posted into any browser to see raw server responses, the request will get all posts that include tags tech & health sorted by likes in descending order: http://localhost:3000/api/posts?tags=tech,health&sortBy=likes&direction=desc
