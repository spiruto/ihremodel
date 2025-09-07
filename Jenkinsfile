pipeline {
  agent any

  environment {
    REPO_URL = 'https://github.com/spiruto/ihremodel.git'
    BRANCH   = 'main'
    EC2_HOST = '3.17.165.44'                 // <- your EC2 public IP/DNS
    EC2_USER = 'ec2-user'
    EC2_DIR  = '/home/ec2-user/ihremodel'    // <- your app path
    PM2_NAME = 'ihremodel'
  }

  options { timestamps() }

  stages {
    stage('Checkout (for visibility only)') {
      steps {
        // Repo is public; this just lets you see the diff & changelog in Jenkins UI
        git branch: "${BRANCH}", url: "${REPO_URL}"
      }
    }

    stage('Deploy on EC2 via SSH') {
      steps {
        sshagent(credentials: ['ec2-ihremodel']) {
          sh '''
set -euo pipefail

ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} <<'EOF'
  set -euo pipefail

  # --- 0) Ensure Node + Yarn are available (Corepack preferred) ---
  if ! command -v node >/dev/null 2>&1; then
    echo "[setup] Node not found, installing via nvm (user scope)…"
    if [ ! -d "$HOME/.nvm" ]; then
      curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    fi
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm use --lts
  else
    echo "[setup] Node found: $(node -v)"
  fi

  if command -v corepack >/dev/null 2>&1; then
    corepack enable || true
  fi

  # --- 1) Clone or update repo ---
  if [ ! -d "${EC2_DIR}/.git" ]; then
    echo "[git] Cloning fresh repo…"
    git clone --branch ${BRANCH} ${REPO_URL} ${EC2_DIR}
  fi

  cd ${EC2_DIR}
  git fetch --all --prune
  git checkout ${BRANCH}
  git reset --hard origin/${BRANCH}

  # --- 2) Install deps with Yarn (supports v1 or Berry) ---
  if command -v yarn >/dev/null 2>&1; then
    echo "[yarn] Using yarn: $(yarn --version)"
  else
    echo "[yarn] Installing Yarn via Corepack…"
    corepack prepare yarn@stable --activate || npm i -g yarn
  fi

  # Prefer lockfile safety when present
  if [ -f yarn.lock ]; then
    yarn install --frozen-lockfile || yarn install
  else
    yarn install
  fi

  # --- 3) Build production assets ---
  NODE_ENV=production yarn build

  # --- 4) Start/reload via PM2 ---
  if ! command -v pm2 >/dev/null 2>&1; then
    npm i -g pm2
  fi

  if pm2 describe ${PM2_NAME} >/dev/null 2>&1; then
    echo "[pm2] Reloading ${PM2_NAME}…"
    pm2 reload ${PM2_NAME}
  else
    echo "[pm2] Starting ${PM2_NAME}…"
    # Next.js: `yarn start` should run "next start" (uses .env on server)
    pm2 start "yarn start" --name "${PM2_NAME}"
  fi

  pm2 save || true
  pm2 status ${PM2_NAME} || true
EOF
          '''
        }
      }
    }
  }

  post {
    success { echo '✅ Deployed to EC2 via Yarn + PM2.' }
    failure { echo '❌ Deployment failed — check the logs.' }
  }
}
