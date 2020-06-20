const fs = require("fs");
fs.writeFileSync(
  "./.env",
  `contentful:{\n
    environmentId:${process.env.environmentId},\n
    spaceId:${process.env.spaceId},\n
    accessToken=${process.env.accessToken}\n
}
  `
);
