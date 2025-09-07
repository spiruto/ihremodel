pipeline {
  agent any

  environment {
    // --- Repo & branch ---
    REPO_URL    = 'https://github.com/spiruto/ihremodel.git'
    BRANCH      = 'main'

    // --- Remote EC2 target ---
    EC2_HOST    = 'ec2-user@3.17.165.44'
    APP_DIR     = '/home/ec2-user/ihremodel'
    PM2_APP     = 'ihremodel'

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
          sh label: 'Deploy over SSH', script: '''
/usr/bin/env bash -euo pipefail <<'BASH'
set -euo pipefail

echo "Local shell: $(bash --version | head -1)"

ssh -o StrictHostKeyChecking=accept-new "${EC2_HOST}" \
  "APP_DIR='${APP_DIR}' REPO_URL='${REPO_URL}' BRANCH='${BRANCH}' PM2_APP='${PM2_APP}' bash -euxo pipefail -s" <<'REMOTE'
set -euxo pipefail

echo "Remote host: $(hostname) | $(uname -a)"
echo "APP_DIR=$APP_DIR  REPO_URL=$REPO_URL  BRANCH=$BRANCH  PM2_APP=$PM2_APP"

# Ensure base dir exists
mkdir -p "$APP_DIR" || true

# Fix ownership if repo exists but not writable
if [ -d "$APP_DIR/.git" ] && [ ! -w "$APP_DIR/.git" ]; then
  echo "Fixing ownership..."
  sudo -n chown -R ec2-user:ec2-user "$APP_DIR" || true
fi

# Fresh clone if still broken
if [ -d "$APP_DIR/.git" ] && [ ! -w "$APP_DIR/.git" ]; then
  echo "Repo still not writable, recloning..."
  ts="$(date +%s)"
  mv "$APP_DIR" "${APP_DIR}.bak.$ts" || true
  mkdir -p "$APP_DIR"
fi

# Clone or update
if [ ! -d "$APP_DIR/.git" ]; then
  echo "Cloning fresh repo..."
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  echo "Updating repo..."
  cd "$APP_DIR"
  git remote set-url origin "$REPO_URL"
  git fetch --all --prune
  git reset --hard "origin/$BRANCH"
fi

cd "$APP_DIR"

# Corepack/Yarn
if ! command -v corepack >/dev/null 2>&1; then
  npm i -g corepack >/dev/null 2>&1 || true
fi
corepack enable || true
yarn set version stable || true

echo 'Installing dependencies...'
yarn install --frozen-lockfile

echo 'Building...'
yarn build

echo 'Starting/reloading with PM2 (using sudo)...'
if sudo pm2 describe "$PM2_APP" >/dev/null 2>&1; then
  sudo pm2 reload "$PM2_APP"
else
  if [ -f ecosystem.config.js ]; then
    sudo pm2 start ecosystem.config.js --only "$PM2_APP" || sudo pm2 start ecosystem.config.js
  else
    sudo pm2 start node_modules/.bin/next --name "$PM2_APP" -- start -p 3000
  fi
fi

sudo pm2 save || true
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
