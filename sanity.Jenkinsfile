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
                stage('Test 1') {
                    steps {
                        sh 'npm run chrome-smoketest-withreport'
                    }
                    post {
                        always {
                            // Publish HTML report for Test 1
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: '/reports/cucumber-html',
                                reportFiles: 'index.html',
                                reportName: 'Cucumber HTML Report - Test 1',
                                reportTitles: ''
                            ])
                            
                               }
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

