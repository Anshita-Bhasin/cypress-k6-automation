pipeline {
    agent any
    tools {nodejs "Node"}
    stages {
       
        stage('e2e Tests') {
               
                    steps {      
                       sh 'npm i'
                        sh 'npm run chrome-smoketest-withreport'
                    }
                    post {
                        always {
                            // Publish HTML report for Test 1
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'reports',
                                reportFiles: 'index.html',
                                reportName: 'Cucumber HTML Report',
                                reportTitles: ''
                            ])
                            
                               }
                    }
                
               
            }
        
    }

}