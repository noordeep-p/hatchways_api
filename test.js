/* eslint-disable no-unused-vars */
const expect = require("chai").expect;
const request = require("request");
const axios = require("axios");

describe("Backend Assessment - Blog Posts", function() {
  it("api returns correct status code and response body for route 1", function(done) {
    request("http://localhost:3000/api/ping", function(error, response, body) {
      expect(body).to.equal('{"success":true}');
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("api will return error if If `tags` parameter is not present:", function(done) {
    request(
      "http://localhost:3000/api/posts",
      function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal('{"error":"Tags parameter is required"}');
        done();
      }
    );
  });

  it("api will return error for incorrect sortBy parameter:", function(done) {
    request(
      "http://localhost:3000/api/posts?tags=tech&sortBy=books",
      function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal('{"error":"sortBy parameter is invalid"}');
        done();
      }
    );
  });

  it("api will return error for incorrect direction parameter:", function(done) {
    request(
      "http://localhost:3000/api/posts?tags=tech&direction=up",
      function(error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.equal('{"error":"direction parameter is invalid"}');
        done();
      }
    );
  });

  it("api will return only unique posts for calls with multiple tags", function(done) {
    axios
      .get("http://localhost:3000/api/posts?tags=tech,health")
      .then((res) => {
        let posts = res.data;
        let uniqueIDs = [];
        let passedTest = true;

        // create an array of post ids and check all ids are unique
        posts.forEach((post) => {
          if (uniqueIDs.includes(post.id)) {
            passedTest = false;
          } else {
            uniqueIDs.push(post.id);
          }
        });

        expect(passedTest).to.equal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    done();
  });
  
});
