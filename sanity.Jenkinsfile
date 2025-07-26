pipeline {
    agent any
    tools {nodejs "Node"}
    stages {
       
        stage('e2e Tests') {
               
                    steps {      
                       sh 'npm i'
                        sh 'npm run chrome-smoketest-withreport'
                    }

                    stage('REPORT'){
                        steps{
                              publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'cypress/reports/html',
                                reportFiles: 'index.html',
                                reportName: 'Cypress HTML Report',
                                reportTitles: ''
                            ])
                        }
                    }
                               
               
            }
        
    }

}