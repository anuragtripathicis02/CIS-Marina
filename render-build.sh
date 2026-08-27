#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Starting Render build process..."

# Install dependencies
pnpm install

echo "Converting Prisma schema to PostgreSQL for Render free tier..."
# Sed replaces "mysql" with "postgresql" in the schema file
sed -i 's/provider\s*=\s*"mysql"/provider = "postgresql"/g' apps/api/prisma/schema.prisma

echo "Building Turborepo..."
pnpm turbo run build --filter=@yacht-platform/api

echo "Render build complete!"
