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
                                reportDir: 'cucumber-htmlreporter/',
                               reportFiles: 'index.html',
                                reportName: 'UI HTML Report',
                                reportTitles: ''
                            ])
                        }
                    }
                               
               
            }
        
    }

