const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");

// Splitting heros image based on sizes
fs.readdirSync(target).forEach((image) => {
  // Image with size 1080px and "-large.jpg" prefix
  sharp(`${target}/${image}`)
    .resize(1080)
    .toFile(
      path.resolve(
        __dirname,
        `${target}/${image.split(".").slice(0, -1).join(".")}-large.jpg`
      )
    );

  // Image with size 720px and "-small.jpg" prefix
  sharp(`${target}/${image}`)
    .resize(720)
    .toFile(
      path.resolve(
        __dirname,
        `${target}/${image.split(".").slice(0, -1).join(".")}-small.jpg`
      )
    );
});
