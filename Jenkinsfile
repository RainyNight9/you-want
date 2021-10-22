pipeline {
    agent any
    options {
      buildDiscarder(logRotator(daysToKeepStr: '7', numToKeepStr: '10', artifactDaysToKeepStr: '7', artifactNumToKeepStr: '1'))
    }
    triggers {
        gitlab(triggerOnPush: true,
            triggerOnMergeRequest: true,
            branchFilterType: 'NameBasedFilter',
            includeBranchesSpec: 'dev,test,master',
            secretToken: '0573f321e9308c9f8edb2f20cc9a2d1e')
    }
    environment {
        _SEND_MESSAGE = 'no'
        _DINGTALK_TOKEN = '47727c2cdda8bd8f47785adde3718714240826ce0388eea4fd00f68c28e2d0aa'
        _REGISTRY_CREDS = credentials('jenkins-docker-registry-creds')
        _K8S_CLOUD1_CONFIG = credentials('jenkins-k8s-config')
        _K8S_CLOUD2_CONFIG = credentials('jenkins-k8s-cloud2-config')
        _K8S_CLOUD3_CONFIG = credentials('jenkins-k8s-cloud3-config')
        _GIT_TAG = sh(returnStdout: true,script: 'echo $GIT_BRANCH-$BUILD_NUMBER').trim()
        _NAMESPACE_SUFFIX = sh(returnStdout: true,script: 'echo $GIT_BRANCH').trim()
        _REGISTRY_HOST = 'registry-vpc.cn-beijing.aliyuncs.com'
        _K8S_CLOUD_ENV = 'cloud3'
        _DOMAIN_NAME = sh(returnStdout: true,script: 'echo query-$GIT_BRANCH.dp.talbrain.com').trim()
        _DOCKER_IMAGE = 'bigdata_platform/dp-query-fe'
        _APP_NAME = 'dp-query-fe'
    }
    post {
        success {
            script {
                if (_SEND_MESSAGE == 'yes') {
                   dingTalk(accessToken: _DINGTALK_TOKEN, notifyPeople: '', message: "部署成功,分支: ${_NAMESPACE_SUFFIX},版本: ${_GIT_TAG}", imageUrl: '', jenkinsUrl: '')
                }
            }
        }
        failure {
            script {
               if (_SEND_MESSAGE == 'yes') {
                   dingTalk(accessToken: _DINGTALK_TOKEN, notifyPeople: '', message: "部署失败,分支: ${_NAMESPACE_SUFFIX},版本: ${_GIT_TAG}", imageUrl: '', jenkinsUrl: '')
               }
            }
        }
    }
    stages {
        stage('Npm Build') {
            agent {
                docker {
                    image 'registry-vpc.cn-beijing.aliyuncs.com/bigdata_platform/tal_bd_node10:latest'
                    args '-v $HOME/.npm:/root/.npm'
                }
            }
            steps {
                sh 'rm -rf node_modules package-lock.json && npm install && npm run build:$GIT_BRANCH'
            }
        }
        stage('Docker Build') {
            agent any
            steps {
                sh "docker login -u ${_REGISTRY_CREDS_USR} -p ${_REGISTRY_CREDS_PSW} ${_REGISTRY_HOST}"
                sh "docker build -f Dockerfile -t ${_REGISTRY_HOST}/${_DOCKER_IMAGE}:${_GIT_TAG} ."
                sh "docker push ${_REGISTRY_HOST}/${_DOCKER_IMAGE}:${_GIT_TAG}"
                sh "docker rmi ${_REGISTRY_HOST}/${_DOCKER_IMAGE}:${_GIT_TAG}"
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'lwolf/helm-kubectl-docker:v1.15.3-v2.14.3'
                }
            }
            steps {
                sh "mkdir -p $HOME/.kube"
                sh "echo ${_K8S_CLOUD_ENV == "cloud1" ? _K8S_CLOUD1_CONFIG : (_K8S_CLOUD_ENV == "cloud2" ? _K8S_CLOUD2_CONFIG : _K8S_CLOUD3_CONFIG)} | base64 -d > $HOME/.kube/config"
                sh "export _DOMAIN_NAME=${_K8S_CLOUD_ENV == "cloud2" ? _DOMAIN_NAME.replaceFirst(/\.dp\.talbrain/, ".dp-new.talbrain") : (_K8S_CLOUD_ENV == "cloud3" ? _DOMAIN_NAME.replaceFirst(/\.dp\.talbrain/, ".dp-udc.talbrain") : _DOMAIN_NAME)} && export _APP_DOMAIN_SUFFIX=${_K8S_CLOUD_ENV == "cloud2" ? "dp-new" : (_K8S_CLOUD_ENV == "cloud3" ? "dp-udc" : "dp")} && kubectl kustomize deploy/overlays/${_K8S_CLOUD_ENV}/${_NAMESPACE_SUFFIX} | envsubst > ./deploy/k8s-deploy.yaml"
                sh "cat ./deploy/k8s-deploy.yaml"
                sh "kubectl apply --kubeconfig=$HOME/.kube/config -f ./deploy/k8s-deploy.yaml --namespace=data-platform-${_NAMESPACE_SUFFIX}"
            }
        }
    }
}
