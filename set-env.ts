import { writeFile } from "fs";

// Configure Angular `environment.ts` file path
const targetPath = "./src/environments/environment.ts";

// Load node modules
const colors = require("colors");
require("dotenv").load();

const envConfig = `export const environment = {
  contentful: {
    environmentId: '${process.env.environmentId}';
    spaceId: '${process.env.spaceId}';
    accessToken: '${process.env.accessToken}';
  };
};
`;

console.log(
  colors.magenta(
    "The file `environment.ts` will be written with the following content: \n"
  )
);
console.log(colors.grey(envConfig));
writeFile(targetPath, envConfig, function(err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
