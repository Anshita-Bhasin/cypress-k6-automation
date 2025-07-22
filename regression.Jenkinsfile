pipeline {
    agent any
    tools {nodejs "Node"}
    stages {
        stage('Dependencies') {
            steps {
                sh 'npm i'
            }
        }
        stage('e2e Tests') {
            parallel {
                stage('Test 1') {
                    steps {
                        sh 'npm run smoketest-withreport'
                    }
                }
                stage('Test 2') {
                    steps {
                        sh 'npm run chrome-smoketest-withreport'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
