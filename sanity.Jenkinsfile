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
                                reportDir: 'cypress/reports/cucumber-html',
                                reportFiles: 'index.html',
                                reportName: 'Cucumber HTML Report - Test 1',
                                reportTitles: ''
                            ])
                            
                            // Archive artifacts
                            archiveArtifacts artifacts: 'cypress/reports/**/*.json', allowEmptyArchive: true
                            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
                            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
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
                                reportDir: 'cypress/reports/cucumber-html-test2',
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
    post {
        always {
            // Publish combined cucumber results (requires Cucumber Reports plugin)
            cucumber buildStatus: 'UNSTABLE',
                reportTitle: 'Combined Cucumber Test Results',
                fileIncludePattern: 'cypress/reports/**/*.json',
                trendsLimit: 10,
                classifications: [
                    [key: 'Browser', value: 'Chrome'],
                    [key: 'Environment', value: 'Test'],
                    [key: 'Execution', value: 'Parallel']
                ]
        }
        failure {
            echo 'Pipeline failed - check the reports for details'
        }
        success {
            echo 'All tests passed successfully!'
        }
    }
}
