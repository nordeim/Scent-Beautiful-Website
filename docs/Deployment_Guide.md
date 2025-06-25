# Deployment Guide for "The Scent" Luxury E-Commerce Website

> **Platform**: Ubuntu Linux 24.04.01 LTS  
> **Project**: [nordeim/Scent-Beautiful-Website](https://github.com/nordeim/Scent-Beautiful-Website)  
> **Audience**: DevOps engineers, developers, sysadmins deploying to a fresh Ubuntu server

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites & Overview](#prerequisites--overview)
3. [System Preparation](#system-preparation)
   - 3.1 [Update the System](#31-update-the-system)
   - 3.2 [Create a Dedicated Deployment User (Optional but Recommended)](#32-create-a-dedicated-deployment-user-optional-but-recommended)
   - 3.3 [Configure Basic Security](#33-configure-basic-security)
4. [Install System Dependencies](#install-system-dependencies)
   - 4.1 [Install Git](#41-install-git)
   - 4.2 [Install Node.js (LTS)](#42-install-nodejs-lts)
   - 4.3 [Install pnpm](#43-install-pnpm)
   - 4.4 [Install Docker & Docker Compose](#44-install-docker--docker-compose)
   - 4.5 [Install Vercel CLI (Optional)](#45-install-vercel-cli-optional)
5. [Database Setup: PostgreSQL 16.x](#database-setup-postgresql-16x)
   - 5.1 [Using Docker for PostgreSQL](#51-using-docker-for-postgresql)
   - 5.2 [Manual Installation (Optional)](#52-manual-installation-optional)
   - 5.3 [Initial Database Creation](#53-initial-database-creation)
6. [Clone the Repository & Project Setup](#clone-the-repository--project-setup)
   - 6.1 [Clone the Repository](#61-clone-the-repository)
   - 6.2 [Project Directory Structure](#62-project-directory-structure)
   - 6.3 [Install Node Dependencies](#63-install-node-dependencies)
7. [Environment Variables & Secrets](#environment-variables--secrets)
   - 7.1 [Copy and Edit .env Files](#71-copy-and-edit-env-files)
   - 7.2 [Configure Database Connection](#72-configure-database-connection)
   - 7.3 [Configure Third-Party Services (Stripe, SendGrid, etc.)](#73-configure-third-party-services-stripe-sendgrid-etc)
   - 7.4 [Other Important Environment Variables](#74-other-important-environment-variables)
   - 7.5 [Secrets Management Tips](#75-secrets-management-tips)
8. [Database Migration & Seeding](#database-migration--seeding)
   - 8.1 [Run Prisma Migrations](#81-run-prisma-migrations)
   - 8.2 [Seed the Database](#82-seed-the-database)
   - 8.3 [Check Database Health](#83-check-database-health)
9. [Building & Running The Application](#building--running-the-application)
   - 9.1 [Development Mode](#91-development-mode)
   - 9.2 [Production Build](#92-production-build)
   - 9.3 [Environment Tuning for Production](#93-environment-tuning-for-production)
   - 9.4 [Process Management: PM2 or systemd](#94-process-management-pm2-or-systemd)
10. [Reverse Proxy & HTTPS (Nginx + Certbot)](#reverse-proxy--https-nginx--certbot)
    - 10.1 [Install Nginx](#101-install-nginx)
    - 10.2 [Configure Nginx as a Reverse Proxy](#102-configure-nginx-as-a-reverse-proxy)
    - 10.3 [Set Up SSL with Certbot](#103-set-up-ssl-with-certbot)
    - 10.4 [Enable Gzip and Security Headers](#104-enable-gzip-and-security-headers)
11. [Zero-Downtime Deployments & Updates](#zero-downtime-deployments--updates)
    - 11.1 [Git Pull & Rebuild](#111-git-pull--rebuild)
    - 11.2 [Database Migration Best Practices](#112-database-migration-best-practices)
    - 11.3 [Rolling Restarts & Blue-Green Strategies](#113-rolling-restarts--blue-green-strategies)
12. [Monitoring, Logging, and Troubleshooting](#monitoring-logging-and-troubleshooting)
    - 12.1 [Log Management](#121-log-management)
    - 12.2 [Monitoring Tools](#122-monitoring-tools)
    - 12.3 [Common Issues & Solutions](#123-common-issues--solutions)
13. [Scaling and Advanced Topics](#scaling-and-advanced-topics)
    - 13.1 [Horizontal Scaling](#131-horizontal-scaling)
    - 13.2 [Database Backups & Disaster Recovery](#132-database-backups--disaster-recovery)
    - 13.3 [Security Hardening](#133-security-hardening)
    - 13.4 [Performance Tuning](#134-performance-tuning)
14. [Appendix: Useful Scripts and Configs](#appendix-useful-scripts-and-configs)
15. [References & Further Reading](#references--further-reading)

---

## Introduction

Welcome to the complete deployment guide for "The Scent" — a luxury aromatherapy e-commerce platform built with Next.js, React, Tailwind CSS, Prisma, and PostgreSQL. This guide is meticulously designed to walk you through every step required to deploy the application from scratch on a pristine Ubuntu Linux 24.04.01 server, whether for staging, production, or advanced local testing.

**What you'll learn:**
- How to configure a secure and robust Ubuntu server environment
- How to install all critical dependencies
- How to provision and configure a PostgreSQL database for production
- How to clone, configure, and build the Scent website
- How to manage environment variables and secrets safely
- How to deploy the app behind Nginx with SSL (HTTPS)
- Best practices for monitoring, scaling, updating, and troubleshooting

---

## Prerequisites & Overview

### Skills Required

- Basic familiarity with Linux shell (bash)
- Understanding of Node.js, npm, and package managers
- Basic PostgreSQL knowledge
- Familiarity with web servers (Nginx) and SSL concepts is helpful

### Hardware Recommendations

- **CPU**: 2+ cores (modern x86_64 or ARM64)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 20GB+ SSD for code, DB, and logs
- **Network**: 1Gbps or better

### Network Prerequisites

- Outbound HTTP/HTTPS access (for installing dependencies)
- Open inbound ports 80 (HTTP) and 443 (HTTPS) for production web traffic

---

## System Preparation

### 3.1 Update the System

Always start by updating your system to the latest packages and security patches.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

### 3.2 Create a Dedicated Deployment User (Optional but Recommended)

Separating deployment from the root account is a security best practice.

```bash
sudo adduser scentdeploy
sudo usermod -aG sudo scentdeploy
```

Switch to the new user for all subsequent steps:

```bash
su - scentdeploy
```

### 3.3 Configure Basic Security

- **SSH Keys:** Set up SSH keys for this user if not already done (`ssh-keygen`, and add public key to `~/.ssh/authorized_keys`).
- **Firewall:** Use UFW (Uncomplicated Firewall):

```bash
sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

- **Fail2Ban:** Prevent brute force login attempts.

```bash
sudo apt install fail2ban -y
sudo systemctl enable --now fail2ban
```

---

## Install System Dependencies

### 4.1 Install Git

```bash
sudo apt install git -y
git --version
```

### 4.2 Install Node.js (LTS)

The project targets Node.js 20+. Check the `.nvmrc` or `package.json` for the preferred version.

**Recommended: Use NodeSource APT repo for Node.js 20.x**

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Alternatively, use [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
node -v
```

### 4.3 Install pnpm

pnpm is required (see `package.json` and project docs).

```bash
npm install -g pnpm
pnpm -v
```

### 4.4 Install Docker & Docker Compose

**For PostgreSQL and optional containerized services.**

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common lsb-release -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

**Log out and log back in to activate docker group.**

Install `docker-compose`:

```bash
sudo apt install docker-compose -y
docker-compose --version
```

### 4.5 Install Vercel CLI (Optional)

This is only necessary if you want to emulate Vercel’s cloud environment locally or use Vercel for deployment.

```bash
npm install -g vercel
vercel --version
```

---

## Database Setup: PostgreSQL 16.x

### 5.1 Using Docker for PostgreSQL

**(Recommended for ease and isolation)**

Create a directory for persistent PostgreSQL data:

```bash
mkdir -p ~/scent-pgdata
```

Create a `docker-compose.yml` (in `~/scent-db/`):

```yaml
version: "3.8"
services:
  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: scentuser
      POSTGRES_PASSWORD: scentpass
      POSTGRES_DB: scentdb
    ports:
      - "5432:5432"
    volumes:
      - ~/scent-pgdata:/var/lib/postgresql/data
```

Start the container:

```bash
cd ~/scent-db
docker compose -f docker-compose.yml up -d
```

**Check status:**

```bash
docker compose ps
```

### 5.2 Manual Installation (Optional)

If you prefer native installation:

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable --now postgresql
```

Set password and create DB/user:

```bash
sudo -u postgres psql
# In psql shell:
CREATE USER scentuser WITH PASSWORD 'scentpass';
CREATE DATABASE scentdb OWNER scentuser;
\q
```

### 5.3 Initial Database Creation

If using Docker, the DB, user, and password are set via `docker-compose.yml`.  
If using local Postgres, see above.

_Note: Adjust the username, password, and db name as needed for your environment and reflect them in your `.env`._

---

## Clone the Repository & Project Setup

### 6.1 Clone the Repository

```bash
git clone https://github.com/nordeim/Scent-Beautiful-Website.git
cd Scent-Beautiful-Website
```

### 6.2 Project Directory Structure

Familiarize yourself with the structure (see `README.md` and [docs/Project_Architecture_Document.md](docs/Project_Architecture_Document.md)).

- `app/` - Next.js App Router pages
- `components/` - UI and feature components
- `lib/` - Backend logic and integrations
- `prisma/` - Database schema, migrations, seeds
- `public/` - Static files, images
- and more...

### 6.3 Install Node Dependencies

```bash
pnpm install
```

This will bootstrap all required dependencies for Next.js, Prisma, Tailwind, etc.

---

## Environment Variables & Secrets

### 7.1 Copy and Edit .env Files

```bash
cp .env.example .env.local
```

Open `.env.local` in your editor:

```bash
nano .env.local
```

### 7.2 Configure Database Connection

Find and edit:

```
DATABASE_URL=postgresql://scentuser:scentpass@localhost:5432/scentdb
```

- Change user/pass/db as appropriate.
- If using Docker and running the app in a container, set `localhost` to `db` (container name) or use your chosen network config.

### 7.3 Configure Third-Party Services (Stripe, SendGrid, etc.)

You’ll find variables such as:

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
SENDGRID_FROM=your@email.com
ALGOLIA_APP_ID=...
ALGOLIA_API_KEY=...
SENTRY_DSN=...
```

Set up accounts for each provider and copy their keys here as needed.

**Tips:**
- Never commit `.env.local` to version control.
- Use strong, unique credentials for each secret.

### 7.4 Other Important Environment Variables

- `NEXTAUTH_URL` — The canonical URL of your deployment (e.g., `https://myscent.com`)
- `EMAIL_SERVER_*` — For Auth.js email sign-in
- `CLOUDINARY_URL` — For image uploads (if using Cloudinary)
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_TOKEN` — If integrating with Sanity CMS

**Consult the codebase and docs for a full list of required variables.**

### 7.5 Secrets Management Tips

- Use [direnv](https://direnv.net/) or [dotenv-vault](https://github.com/dotenv-org/dotenv-vault) for secure local secret injection.
- For production, consider an encrypted secrets manager (e.g., Hashicorp Vault, AWS Secrets Manager), or managed Vercel/Netlify secrets if deploying to cloud.

---

## Database Migration & Seeding

### 8.1 Run Prisma Migrations

Ensure the database is running and accessible. Then:

```bash
pnpm prisma generate
pnpm prisma migrate deploy
```

- This will apply all migrations in `prisma/migrations/` to your database.

### 8.2 Seed the Database

If you have a seed script (e.g., `prisma/seed.ts`):

```bash
pnpm prisma db seed
```

**Note:**  
- The seed script may expect certain environment variables (see `prisma/seed.ts`).
- Review or customize it for your data needs.

### 8.3 Check Database Health

Connect with a tool like `psql`, [pgAdmin](https://www.pgadmin.org/), or a GUI (e.g., TablePlus, DBeaver) to verify tables and seed data.

```bash
psql -h localhost -U scentuser -d scentdb
```

Test a simple query:

```sql
SELECT * FROM users LIMIT 1;
```

---

## Building & Running The Application

### 9.1 Development Mode

To run the app in development (hot reload):

```bash
pnpm dev
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

### 9.2 Production Build

**1. Build the app:**

```bash
pnpm build
```

**2. Start in production mode:**

```bash
pnpm start
```

- By default, Next.js listens on port 3000.  
- Set `PORT=xxxx` in your `.env.local` to change.

### 9.3 Environment Tuning for Production

- Set `NODE_ENV=production` in `.env.local` for optimizations.
- Increase memory limits if needed (for large builds):

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
```

### 9.4 Process Management: PM2 or systemd

**Option 1: Use PM2**

Install PM2 globally:

```bash
pnpm add -g pm2
```

Start the app with PM2:

```bash
pm2 start "pnpm start" --name scent-app
pm2 save
pm2 startup
```

**Option 2: Use systemd**

Create a service unit at `/etc/systemd/system/scent-app.service`:

```ini
[Unit]
Description=The Scent E-Commerce (Next.js) App
After=network.target

[Service]
Type=simple
User=scentdeploy
WorkingDirectory=/home/scentdeploy/Scent-Beautiful-Website
Environment=NODE_ENV=production
EnvironmentFile=/home/scentdeploy/Scent-Beautiful-Website/.env.local
ExecStart=/usr/bin/pnpm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Reload systemd and start:

```bash
sudo systemctl daemon-reload
sudo systemctl start scent-app
sudo systemctl enable scent-app
sudo systemctl status scent-app
```

---

## Reverse Proxy & HTTPS (Nginx + Certbot)

### 10.1 Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable --now nginx
```

### 10.2 Configure Nginx as a Reverse Proxy

Create a new file `/etc/nginx/sites-available/scent`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    access_log /var/log/nginx/scent.access.log;
    error_log /var/log/nginx/scent.error.log;
}
```

Enable the site and test config:

```bash
sudo ln -s /etc/nginx/sites-available/scent /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 10.3 Set Up SSL with Certbot

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Obtain and install the SSL certificate:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

- Certbot will automatically update your Nginx config with SSL settings.

**Renewal is automatic via systemd, but test renewal:**

```bash
sudo certbot renew --dry-run
```

### 10.4 Enable Gzip and Security Headers

Edit your Nginx config to add:

```nginx
# Inside the server block
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Security Headers
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()";
add_header Content-Security-Policy "default-src 'self'; img-src * data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

---

## Zero-Downtime Deployments & Updates

### 11.1 Git Pull & Rebuild

When updating the application:

```bash
cd /home/scentdeploy/Scent-Beautiful-Website
git pull origin main
pnpm install
pnpm build
pnpm prisma migrate deploy
pm2 restart scent-app
# or
sudo systemctl restart scent-app
```

### 11.2 Database Migration Best Practices

- Always back up your DB before migrations.
- Use `prisma migrate deploy` for production (not `dev`).
- For critical migrations, test on a staging environment first.

### 11.3 Rolling Restarts & Blue-Green Strategies

- For high-availability, use two instances and switch Nginx upstreams.
- Consider Docker Compose or Kubernetes for advanced deployment (beyond this guide’s scope).

---

## Monitoring, Logging, and Troubleshooting

### 12.1 Log Management

- Application logs: view via PM2 (`pm2 logs scent-app`) or journalctl (`sudo journalctl -u scent-app`)
- Nginx logs: `/var/log/nginx/scent.access.log`, `/var/log/nginx/scent.error.log`
- Rotate logs using `logrotate` (Ubuntu’s default).

### 12.2 Monitoring Tools

- **Sentry**: Integrated via `SENTRY_DSN` for error tracking.
- **Vercel Analytics**: If using Vercel.
- **htop**, **glances**: For system health.
- **PostgreSQL logs**: `/var/lib/postgresql/data/log` (Docker), `/var/log/postgresql/` (native).

### 12.3 Common Issues & Solutions

- **Port 3000 already in use**: Find and kill with `sudo lsof -i :3000`
- **Prisma connection errors**: Check `DATABASE_URL` and DB status.
- **SSL issues**: Re-run `certbot` or check Nginx config.
- **App not starting**: Check `.env.local`, run `pnpm build` again, check logs.

---

## Scaling and Advanced Topics

### 13.1 Horizontal Scaling

- Use a load balancer (Nginx or HAProxy) in front of multiple app instances.
- Use Redis or similar for session state if needed.

### 13.2 Database Backups & Disaster Recovery

- **Docker:**  
  ```bash
  docker exec -t scent-db-db-1 pg_dumpall -c -U scentuser > ~/scentdb_backup_$(date +%Y-%m-%d).sql
  ```
- **Native:**  
  ```bash
  pg_dump -U scentuser -W -F t scentdb > ~/scentdb_backup_$(date +%Y-%m-%d).tar
  ```
- Automate with cron or systemd timers.

### 13.3 Security Hardening

- Keep system and dependencies up to date.
- Use strong, unique passwords for DB and secrets.
- Restrict DB access to localhost or internal network.
- Limit SSH access (firewall, keys only).
- Regularly audit logs for anomalies.

### 13.4 Performance Tuning

- Enable Next.js image optimization and caching.
- Use CDNs for static assets.
- Tune PostgreSQL settings for production workloads.
- Monitor Core Web Vitals and optimize accordingly.

---

## Appendix: Useful Scripts and Configs

### Example: PM2 Ecosystem File

```js
module.exports = {
  apps: [{
    name: "scent-app",
    script: "pnpm",
    args: "start",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
```

Start with:

```bash
pm2 start ecosystem.config.js --env production
```

### Example: PostgreSQL Backup Cron Job

Add to your crontab (`crontab -e`):

```cron
0 3 * * * /usr/bin/docker exec -t scent-db-db-1 pg_dumpall -c -U scentuser > /home/scentdeploy/db_backups/scentdb_backup_$(date +\%Y-\%m-\%d).sql
```

---

## References & Further Reading

- [Project README.md](./README.md)
- [Project_Architecture_Document.md](./docs/Project_Architecture_Document.md)
- [Execution_Plan.md](./docs/Execution_Plan.md)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Production Deployment](https://www.prisma.io/docs/orm/prisma-client/deployment)
- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [Certbot SSL Docs](https://certbot.eff.org/)
- [PM2 Process Manager](https://pm2.keymetrics.io/)
- [Ubuntu Security Guide](https://ubuntu.com/server/docs/security-hardening)
- [Vercel CLI & Cloud Deployments](https://vercel.com/docs/cli)
- [Sanity CMS Docs](https://www.sanity.io/docs)

---

*This guide is a living document. For questions, submit an issue on the [project repository](https://github.com/nordeim/Scent-Beautiful-Website/issues).*

---

**Deploy with confidence. Deliver luxury. Welcome to The Scent.**
