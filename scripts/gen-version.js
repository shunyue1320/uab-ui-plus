const version = require('../package.json').version

require('fs').writeFileSync(
  require('path').resolve(__dirname, '..', 'package', 'version.ts'),
  `export default '${version}'\n`
)
