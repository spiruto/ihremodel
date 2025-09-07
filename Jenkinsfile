pipeline {
  agent any

  environment {
    // --- Repo & branch ---
    REPO_URL    = 'https://github.com/spiruto/ihremodel.git'
    BRANCH      = 'main'

    // --- Remote EC2 target ---
    EC2_HOST    = 'ec2-user@3.17.165.44'   // <-- CHANGE: your EC2 public IP or DNS
    APP_DIR     = '/home/ec2-user/ihremodel'
    PM2_APP     = 'ihremodel'                    // <-- CHANGE if your PM2 process has a different name

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
          // Run bash explicitly via a here-doc, so we don't rely on Jenkins' default /bin/sh
          sh label: 'Deploy over SSH', script: '''
/usr/bin/env bash -euo pipefail <<'BASH'
set -euo pipefail

# Show where we are running (Jenkins node)
echo "Local shell: $(bash --version | head -1)"

# Push env vars into the remote session and run a quoted here-doc there too
ssh -o StrictHostKeyChecking=accept-new "${EC2_HOST}" \
  "APP_DIR='${APP_DIR}' REPO_URL='${REPO_URL}' BRANCH='${BRANCH}' PM2_APP='${PM2_APP}' bash -s" <<'REMOTE'
set -euo pipefail

echo "Remote host: $(hostname) | $(uname -a)"
echo "APP_DIR=$APP_DIR  REPO_URL=$REPO_URL  BRANCH=$BRANCH  PM2_APP=$PM2_APP"

# Ensure project folder exists and repo is present
if [ ! -d "$APP_DIR/.git" ]; then
  mkdir -p "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  cd "$APP_DIR"
  git remote set-url origin "$REPO_URL"
  git fetch --all --prune
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
    # Fallback: Next.js on port 3000
    pm2 start node_modules/.bin/next --name "$PM2_APP" -- start -p 3000
  fi
fi

pm2 save || true
REMOTE
BASH
'''
        }
      }
    }
  }

  post {
    success { echo '✅ Deployed to EC2.' }
    failure { echo '❌ Deployment failed — check the logs.' }
  }
}
