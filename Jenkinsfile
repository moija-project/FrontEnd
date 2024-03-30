def component = [
		Preprocess: false,
		Hyper: false,
		Train: false,
		Test: false,
		Bento: false
]
pipeline {
	agent any
	stages {
		stage("Checkout") {
			steps {
				checkout scm
			}
		}
		stage("Build") {
			steps {
                script {
					docker.build('shinyenggwak/front')
				}
			}
		}
		stage("Tag and Push") {
			steps {
                script {
					docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials')
                                 app.push("${env.BUILD_NUMBER}")
                                 app.push("latest")
				}
			}
		}
	}
}