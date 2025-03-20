const { server } = require("./app");
const PORT = process.env.PORT || 8000;

const NODE_ENV = process.env.NODE_ENV || "development";
const serverStartTime = Date.now();

server.listen(PORT, () => {
  console.log(`🚀 Server started in ${Date.now() - serverStartTime}ms`);
  console.log(
    `🚀 Server running on http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
