It looks like you've installed pnpm as a local dependency (inside your project’s `node_modules`) rather than as a global command-line tool. When you run:

```bash
npm install pnpm
```

it installs the package locally, so the executable isn’t added to your system’s PATH. That’s why running `pnpm --version` returns “command not found.”

Here are a few approaches you can take:

### 1. Install pnpm Globally

The simplest way to use pnpm as a command from anywhere is to install it globally. Run:

```bash
npm install -g pnpm
```

Once that completes, verify the installation:

```bash
pnpm --version
```

This should output the version of pnpm installed. If you run into any permission issues on Ubuntu, you might consider using a Node version manager (like [nvm](https://github.com/nvm-sh/nvm)) to avoid needing `sudo` for global installs.

### 2. Use npx to Run the Local Installation

If you prefer not to install pnpm globally, you can invoke the locally installed version using `npx`. This avoids modifying your global environment:

```bash
npx pnpm --version
```

And you can run other pnpm commands the same way, for example:

```bash
npx pnpm prisma migrate dev
```

### 3. Install pnpm Using the Official Script

Another popular option is to use the installer provided by pnpm. This method downloads a portable executable and sets up pnpm. Execute this command:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

After running the script, make sure the installation path (usually something like `${HOME}/.local/share/pnpm`) is added to your PATH. Restart your terminal or source your profile settings and then check:

```bash
pnpm --version
```

---

Give one of these methods a try, and you should be able to run pnpm as expected on your Ubuntu 24.04.01 system. If you’re primarily doing project-specific work, the `npx` approach is a convenient option that avoids global installation, while the global installation can be better if you use pnpm across multiple projects.

https://copilot.microsoft.com/shares/SJRMQQEDaZtH3DYsS9NwQ

