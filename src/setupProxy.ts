// // import { createProxyMiddleware, Filter, Options } from "http-proxy-middleware";
// // import { Application } from "express";

// // const addCorsHeaders = (proxyRes: any, req: any, res: any) => {
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// // };

// // // module.exports = (app: Application) => {
// // //   app.use(
// // //     "/post",
// // //     createProxyMiddleware({
// // //       target: "http://localhost:8090",
// // //       changeOrigin: true,
// // //       onProxyRes: addCorsHeaders,
// // //     })
// // //   );
// // // };

// import { createProxyMiddleware } from "http-proxy-middleware";
// import { Express } from "express";

// export default function (app: Express) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://mo.ija.kro.kr/",
//       pathRewrite: {
//         "^/api": "",
//       },
//     })
//   );
// }
