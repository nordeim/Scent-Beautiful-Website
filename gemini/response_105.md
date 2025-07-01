The error occurs because `ts-node` is having trouble with ES modules. Here are two solutions:

## Solution 1: Use `tsx` instead of `ts-node` (Recommended)

First, install `tsx`:

```bash
pnpm add -D tsx
```

Then update your `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

## Solution 2: Configure ts-node for ES modules

Update your `package.json` to use ts-node with the ESM loader:

```json
{
  "prisma": {
    "seed": "node --loader ts-node/esm prisma/seed.ts"
  }
}
```

And add a `tsconfig.json` in your prisma folder (`prisma/tsconfig.json`):

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "ts-node": {
    "esm": true
  }
}
```

## Solution 3: Use CommonJS with proper typing

If you prefer to stick with CommonJS, here's the corrected seed file:

```typescript
// prisma/seed.ts
import type { Prisma } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

type TransactionClient = Prisma.TransactionClient

async function main() {
  // ... rest of your seed code remains the same
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

I recommend **Solution 1** with `tsx` as it's more modern and handles TypeScript better. After installing `tsx` and updating your package.json, run:

```bash
pnpm prisma migrate reset
```

