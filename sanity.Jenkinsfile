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
                stage('Test 2') {
                    steps {
                        sh 'npm run chrome-smoketest-withreport'
                    }
                    post {
                        always {
                            // Publish HTML report for Test 2
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: '/reports/cucumber-html-test2',
                                reportFiles: 'index.html',
                                reportName: 'Cucumber HTML Report - Test 2',
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
}
