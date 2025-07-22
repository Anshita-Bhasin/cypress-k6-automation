pipeline {
    agent any
    tools {
        nodejs 'NodeJS-18' 
    }

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
        

stage('Verify Node Installation') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }}


        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Parallel Cypress Tests') {
            parallel {
                stage('Smoke Tests') {
                    steps {
                       
                            sh 'npm run smoke-test-browser-chrome'
                        }
                    }
                

                stage('Regression Tests - Group 2') {
                    steps {
                        
                            sh 'npm run regression-test'
                        
                    }
                }
            }
        }

        
    }

   
}
