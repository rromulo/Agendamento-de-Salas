const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: './dist',
  paths: {
    "@core/*": ["core/*"],
    "@infra/*": ["infra/*"],
    "@routes/*": ["routes/*"],
    "@utils/*": ["utils/*"],
    "@cases/*": ["use-cases/*"],
    "@middlewares/*": ["middlewares/*"],
    "@validations/*": ["validations/*"]
  }
});

require('./dist/server.js');