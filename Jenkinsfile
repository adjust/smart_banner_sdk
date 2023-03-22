#!groovy

pipeline {
  tools {
    nodejs 'nodejs_14.20.0'
  }
  agent {
    node {
      label 'new'
    }
  }
  stages {
    stage('Setup') {
      steps {
        sh "npm install"
      }
    }
    stage('Build') {
      steps {
        sh "npm run clean"
        sh "npm run build"
      }
    }
    stage('Test') {
      steps {
        sh "npm run test"
      }
    }
    
  }
  post {
    always {
      cleanWs()
    }
  }
}
