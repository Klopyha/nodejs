const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first assignment home page</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Enter a user</button></input></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>List of users</title></head>");
    res.write("<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first assignment</title></head>");
  res.write("<body><h1>Welcome</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
