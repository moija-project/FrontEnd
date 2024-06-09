const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 첫 번째 프록시 경로
    createProxyMiddleware({
      target: "http://mo.ija.kro.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  app.use(
    "/stomp/ws", // 두 번째 프록시 경로
    createProxyMiddleware({
      target: "http://localhost:15672",
      changeOrigin: true,
      ws: true, // WebSocket 지원
    })
  );
};
