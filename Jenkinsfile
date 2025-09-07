pipeline {
  agent any

  environment {
    // --- Repo & branch ---
    REPO_URL    = 'https://github.com/spiruto/ihremodel.git'
    BRANCH      = 'main'

    // --- Remote EC2 target ---
    EC2_HOST    = 'ec2-user@3.17.165.44'   // <-- CHANGE to your EC2 public IP or DNS
    APP_DIR     = '/home/ec2-user/ihremodel'
    PM2_APP     = 'ihremodel'                    // <-- PM2 process name (change if different)

    // --- Jenkins credential id for your PEM key ---
    SSH_CRED_ID = 'ec2-ihremodel'
  }

  options { timestamps() }

  stages {
    stage('Checkout (for visibility only)') {
      steps {
        git url: env.REPO_URL, branch: env.BRANCH
      }
    }

    stage('Deploy on EC2 via SSH') {
      steps {
        sshagent(credentials: [env.SSH_CRED_ID]) {
          // Use Bash explicitly and send a here-doc to the remote host
          sh """#!/bin/bash -eo pipefail
ssh -o StrictHostKeyChecking=accept-new "${EC2_HOST}" 'bash -s' <<'REMOTE'
set -euo pipefail

APP_DIR='${APP_DIR}'
REPO_URL='${REPO_URL}'
BRANCH='${BRANCH}'
PM2_APP='${PM2_APP}'

# Ensure project folder exists and repo is present
if [ ! -d "$APP_DIR/.git" ]; then
  mkdir -p "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  cd "$APP_DIR"
  git remote set-url origin "$REPO_URL"
  git fetch --all
  git reset --hard "origin/$BRANCH"
fi

cd "$APP_DIR"

# Ensure Yarn via Corepack
if ! command -v corepack >/dev/null 2>&1; then
  npm i -g corepack >/dev/null 2>&1 || true
fi
corepack enable || true
yarn set version stable || true

echo 'Installing dependencies...'
yarn install --frozen-lockfile

echo 'Building...'
yarn build

echo 'Starting/reloading with PM2...'
if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
  pm2 reload "$PM2_APP"
else
  if [ -f ecosystem.config.js ]; then
    pm2 start ecosystem.config.js --only "$PM2_APP" || pm2 start ecosystem.config.js
  else
    # fallback: Next.js on port 3000
    pm2 start node_modules/.bin/next --name "$PM2_APP" -- start -p 3000
  fi
fi

pm2 save || true
REMOTE
"""
        }
      }
    }
  }

  post {
    success { echo '✅ Deployed to EC2.' }
    failure { echo '❌ Deployment failed — check the logs.' }
  }
}
