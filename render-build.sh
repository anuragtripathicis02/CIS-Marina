#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Starting Render build process..."

# Temporarily unset NODE_ENV so pnpm installs devDependencies (like turbo & typescript)
export OLD_NODE_ENV=$NODE_ENV
export NODE_ENV=""
pnpm install

echo "Converting Prisma schema to PostgreSQL for Render free tier..."
# Sed replaces "mysql" with "postgresql" in the schema file
sed -i 's/provider\s*=\s*"mysql"/provider = "postgresql"/g' apps/api/prisma/schema.prisma

echo "Generating Prisma Client and Pushing to Database..."
cd apps/api
npx prisma generate
npx prisma db push --accept-data-loss
cd ../..

echo "Building Turborepo..."
npx turbo run build --filter=@yacht-platform/api

# Restore NODE_ENV for the actual app startup
export NODE_ENV=$OLD_NODE_ENV

echo "Render build complete!"
