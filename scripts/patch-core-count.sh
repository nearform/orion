# This script fixes a problem with production builds failing due to out of memory errors.
# This happens because Gatsby fires up an excessive number of worker threads when doing
# a build; see https://github.com/gatsbyjs/gatsby/issues/7373#issuecomment-561631969
# Gatsby doesn't provide any proper way to control this, so the following overwrites the
# file cpu-core-count.js so that it always returns a value of 1.
echo "module.exports = { cpuCoreCount: () => 1 };" > node_modules/gatsby-core-utils/dist/cpu-core-count.js
