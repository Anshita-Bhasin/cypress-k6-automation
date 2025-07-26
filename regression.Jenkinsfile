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
         stage('Debug Report Folder') {
            steps {
                sh 'find cypress/reports/html -type f'
                sh 'cat cypress/reports/html/index.html | head -n 20 || echo "No index.html found"'
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
                                keepAll: true,
                                reportDir: 'cypress/reports/html/',
                                reportFiles: 'index.html',
                                reportName: 'UI HTML Report',
                                reportTitles: ''
                            ])
                        }
                    }

stage('HTML REPORT'){
                        steps{
                              publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                 reportDir: 'cypress/reports/cucumber-htmlreporter/',
                               reportFiles: 'index.html',
                                reportName: 'Cucumber HTML Report',
                                reportTitles: ''
                            ])
                        }
                    
                    
    }
}
