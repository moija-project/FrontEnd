const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 첫 번째 프록시 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/stomp/chat", // 두 번째 프록시 경로
    // "/stomp/ws", // 두 번째 프록시 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_API_URL,
      // target: "http://localhost:8093",
      changeOrigin: true,
      ws: false, // WebSocket 지원
    })
  );
  app.use(
    "/stomp/notify", // 두 번째 프록시 경로
    // "/stomp/ws", // 두 번째 프록시 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_API_URL,
      // target: "http://localhost:8093",
      changeOrigin: true,
      ws: false, // WebSocket 지원
    })
  );

  app.use(
    "/pub/chat",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_API_URL,
      changeOrigin: true,
      ws: false,
    })
  );
  app.use(
    "/exchange/chat",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_API_URL,
      changeOrigin: true,
      ws: false,
    })
  );
};
