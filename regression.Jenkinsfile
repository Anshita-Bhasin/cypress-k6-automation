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
                    steps {
                        sh 'npm run smoke-test-browser-ff'
                    }
               
            
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
         stage('REPORT'){
                        steps{
                              publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: false,
                                reportDir: 'cypress/reports/html/',
                               reportFiles: 'index.html',
                                reportName: 'UI HTML Report',
                                reportTitles: ''
                            ])
                        }
                    }
    }
}
