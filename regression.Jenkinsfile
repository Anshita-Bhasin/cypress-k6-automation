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
                        sh 'npm run chrome-smoketest-withreport'
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

}