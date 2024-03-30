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

				docker.build('shinyenggwak/front')
			}
		}
		stage("Tag and Push") {
			steps {
                docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials')
                             app.push("${BUILD_DATE_FORMATTED, "yyyy:MM:dd"}-develop")
                             app.push("latest")

			}
		}
	}
}