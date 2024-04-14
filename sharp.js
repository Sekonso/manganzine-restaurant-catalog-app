const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");

// Splitting heros image based on sizes
fs.readdirSync(target).forEach((image) => {
  // Image with size 800px and "-large.jpg" prefix
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(
      path.resolve(
        __dirname,
        `${target}/${image.split(".").slice(0, -1).join(".")}-large.jpg`
      )
    );

  // Image with size 480px and "-large.jpg" prefix
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${target}/${image.split(".").slice(0, -1).join(".")}-small.jpg`
      )
    );
});
