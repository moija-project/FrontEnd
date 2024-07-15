def component = [
		Preprocess: false,
		Hyper: false,
		Train: false,
		Test: false,
		Bento: false
]
pipeline {
	agent {
        kubernetes {
                    yaml """
        apiVersion: v1
        kind: Pod
        metadata:
          labels:
            jenkins/agent-type: kaniko
        spec:
          containers:
            - name: jnlp
              image: jenkins/inbound-agent:latest
              resources:
                requests:
                  memory: "512Mi"
                  cpu: "500m"
                limits:
                  memory: "1024Mi"
                  cpu: "1000m"
            - name: kaniko
              image: gcr.io/kaniko-project/executor:debug
              command:
                - /busybox/cat
              tty: true
              resources:
                requests:
                  memory: "2048Mi"
                  cpu: "2000m"
                limits:
                  memory: "4096Mi"
                  cpu: "4000m"
              volumeMounts:
                - name: docker-config
                  mountPath: /kaniko/.docker/
          volumes:
            - name: docker-config
              secret:
                secretName: docker-config
                    """
        }
    }

    environment {
            DOCKERHUB_USERNAME = "shinyenggwak"
            IMAGE_NAME = "jenkins-test"
    }

	stage("Build Docker Image & Push to Docker Hub") {
        steps {
            container("kaniko") {
                script {
                    def context = "./app"
                    def dockerfile = "./app/Dockerfile"
                    def image = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"

                    sh 'apk add --no-cache git'

                    sh "git clone https://github.com/moija-project/FrontEnd.git ./app"
                    sh "cd ./app && git checkout sy-development"

                    sh "/kaniko/executor --context ${context} --dockerfile ${dockerfile} --destination ${image}"
                }
            }
        }
    }
}