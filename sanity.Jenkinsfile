pipeline {
    agent any
    tools {nodejs "Node"}
    stages {
       
        stage('e2e Tests') {
               
                    steps {      
                       sh 'npm i'
                        sh 'npm run chrome-smoketest-withreport'
                    }}

                    stage('REPORT'){
                        steps{
                              publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: false,
                                reportDir: 'reports/cucumber-htmlreport',
                                reportFiles: 'index.html',
                                reportName: 'HTML Report',
                                reportTitles: ''
                            ])
                        }
                    }
                               
               
            }
        
    }

