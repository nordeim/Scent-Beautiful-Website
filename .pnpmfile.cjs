function readPackage(pkg) {
  if (
    pkg.name === '@prisma/client' ||
    pkg.name === '@prisma/engines' ||
    pkg.name === 'prisma'
  ) {
    pkg.scripts = {
      ...pkg.scripts,
      'prisma:postinstall': 'prisma generate',
      postinstall: 'prisma generate',
    };
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
