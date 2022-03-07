/* eslint-disable func-style */
const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();
// initialize express server
const app = express();
const PORT = 3000;
// create arrays with valid queries to compare with queries
const validSortByQueryStringsArray = ["id", "reads", "likes", "popularity"];
const validDirectionQueryStringsArray = ["asc", "desc"];
// helper functions

// make individual api call's to server
async function makeAPIRequestsByTag(tags) {
  const individualAPIRequestsArray = tags.split(",");
  const promises = [];

  for (const requestTag of individualAPIRequestsArray) {
    promises.push(
      axios
        .get(`https://api.hatchways.io/assessment/blog/posts?tag=${requestTag}`)
        .then((res) => res.data.posts)
    );
  }
  return await Promise.all(promises).then((data) => data);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

router.get("/ping", (req, res) => {
  axios
    .get("https://api.hatchways.io/assessment/blog/posts?tag=tech")
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json({ success: true });
      }
    })
    .catch((e) => console.log(e));
});

router.get("/posts", async (req, res) => {
  const { tags, sortBy, direction } = req.query;
  if (!tags)
    return res.status(400).json({ error: "Tags parameter is required" });
  if (sortBy && !(validSortByQueryStringsArray.indexOf(sortBy) > -1))
    return res.status(400).json({ error: "sortBy parameter is invalid" });
  if (direction && !(validDirectionQueryStringsArray.indexOf(direction) > -1))
    return res.status(400).json({ error: "direction parameter is invalid" });

  const data = await makeAPIRequestsByTag(tags);
  const combinedData = data.flat();

  // first create an set from the data ids thus filtering out duplicates ids,
  // then use the find method to return the first instance of the id
  // in the original data, effectively filtering out duplicates.

  const uniqueData = Array.from(
    new Set(combinedData.map((data) => data.id))
  ).map((id) => {
    return combinedData.find((post) => post.id === id);
  });

  res.json(uniqueData);
});

app.use("/api", router);
