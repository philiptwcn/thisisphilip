const replace = require('replace-in-file')

let environmentId = process.env.environmentId
let spaceId = process.env.spaceId
let accessToken = process.env.accessToken

const config = {
  files: 'src/environments/environment.prod.ts',
  from: [/{ENVIRONMENT_ID}/g, /{SPACE_ID}/g, /{ACCESS_TOKEN}/g],
  to: [environmentId, spaceId, accessToken],
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(config);
  console.log('Variables changed', changedFiles);
}
catch (error) {
  console.error('Error occurred:', error);
}
