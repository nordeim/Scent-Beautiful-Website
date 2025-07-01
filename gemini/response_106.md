It looks like the seed script is failing because `tsx` isn't being found. Even though `tsx` is listed in your devDependencies, it seems there might be an issue with how it's being invoked.

Here are a few ways to fix this:

1. **Try running the seed script directly with pnpm:**
```bash
pnpm tsx prisma/seed.ts
```

2. **Or use ts-node which you already have installed:**
Update your `package.json` to use ts-node instead:
```json
"prisma": {
  "seed": "ts-node --transpile-only prisma/seed.ts"
}
```

3. **Or ensure tsx is properly installed:**
```bash
pnpm add -D tsx
```

Then try the migrate reset again:
```bash
pnpm prisma migrate reset
```

If you want to just run the seed script without resetting the database again (since the migrations already ran successfully), you can run:
```bash
pnpm prisma db seed
```

The seed script itself looks good - it's properly handling transactions and creating all the test data. The issue is just with the TypeScript runner not being found in the PATH when Prisma tries to execute it.

