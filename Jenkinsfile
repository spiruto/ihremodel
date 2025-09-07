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
    sshagent(credentials: [env.SSH_CRED_ID ?: 'ec2-ihremodel']) {
      // run this step with bash instead of /bin/sh
      sh(
        shell: '/bin/bash',
        label: 'SSH deploy',
        script: '''
set -euo pipefail

EC2_HOST="ec2-user@3.17.165.44"   # <--- update if your IP/host changed
APP_DIR="/home/ec2-user/ihremodel"

ssh -o StrictHostKeyChecking=accept-new "$EC2_HOST" bash -lc "
  set -euo pipefail
  cd '$APP_DIR'
  echo 'Pulling latest...'
  git fetch --all
  git reset --hard origin/main
  echo 'Installing deps...'
  corepack enable || true
  yarn install --frozen-lockfile
  echo 'Building...'
  yarn build
  echo 'Reloading PM2...'
  pm2 reload ihr || pm2 start ecosystem.config.js --only ihr || true
  pm2 save || true
"
'''
      )
    }
  }
  post { failure { echo '❌ Deployment failed — check the logs.' } }
}
  }

  post {
    success { echo '✅ Deployed to EC2 via Yarn + PM2.' }
    failure { echo '❌ Deployment failed — check the logs.' }
  }
}
