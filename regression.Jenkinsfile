pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'staging', 'prod'],
            description: 'Select environment to run tests'
        )
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox', 'edge'],
            description: 'Select browser for testing'
        )
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm ci'
                }
            }
        }

        stage('Parallel Cypress Tests') {
            parallel {
                stage('Smoke Tests') {
                    steps {
                        script {
                            sh 'npm run smoke-test-browser-chrome'
                        }
                    }
                }

                stage('Regression Tests - Group 2') {
                    steps {
                        script {
                            sh 'npm run regression-test'
                        }
                    }
                }
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Test Report'
                ])
                
            }
        }
    }

   
}
