/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        
        // Add rule for pdf.worker
        config.module.rules.push({
          test: /pdf\.worker\.(min\.)?js/,
          type: 'asset/resource'
        });
        
        return config;
      }
  }

module.exports = nextConfig;

// const withTM = require("next-transpile-modules")(["pdfjs-dist"]);

// module.exports = withTM({
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /pdf\.worker\.(min\.)?js$/,
//       loader: "file-loader",
//       options: {
//         name: "[name].[ext]",
//         publicPath: "/_next/static/workers/",
//         outputPath: "static/workers/",
//       },
//     });
//     return config;
//   },
// });
