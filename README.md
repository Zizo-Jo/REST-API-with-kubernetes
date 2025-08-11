# Final-Project-of-NA
# Final Project: Deploying a Flask REST API with Kubernetes

This project demonstrates how to deploy, scale, and manage a containerized Flask REST API using Minikube and Kubernetes. It also covers adding a MongoDB database to the cluster.

## Table of Contents

- [Part 1: Introduction to Kubernetes](#part-1-introduction-to-kubernetes)
  - [Key Concepts](#key-concepts)
  - [REST API Modification](#rest-api-modification)
- [Part 2: Setup and Deployment](#part-2-setup-and-deployment)
  - [Installation](#installation)
  - [Building the Docker Image](#building-the-docker-image)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [Part 3: Scaling and Management](#part-3-scaling-and-management)
  - [Scaling the Application](#scaling-the-application)
  - [Inspecting the Cluster](#inspecting-the-cluster)
  - [Kubernetes Dashboard](#kubernetes-dashboard)
- [Part 4: Adding a Database (MongoDB)](#part-4-adding-a-database-mongodb)
  - [Deploying MongoDB](#deploying-mongodb)
  - [Accessing the Database](#accessing-the-database)

## Part 1: Introduction to Kubernetes

### Key Concepts

*   **Kubernetes**: An open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.
*   **Minikube**: A lightweight Kubernetes implementation that creates a single-node cluster locally for development and testing.
*   **Pod**: The smallest deployable unit in Kubernetes, which can contain one or more containers.
*   **Service**: An abstraction that defines a logical set of Pods and a policy by which to access them.
*   **Deployment**: Manages the application lifecycle, ensuring a specified number of replicas are running and handling updates.

### REST API Modification

The original Flask REST API was modified to be "Kubernetes-aware". The updated version dynamically fetches and displays the Pod's IP address. This is useful for verifying networking and demonstrating scaling, as each replica Pod will have a unique IP.

**Original `app.py`:**
```python
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return "HELLO Zihao, I'm god"

@app.route("/system")
def system():
    name = 'Docker'
    mail = 'my_email@gmail.com'
    return jsonify(
        system=name,
        email=mail
    )

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5200)
```

**Modified `app.py`:**
```python
from flask import Flask, render_template, jsonify, redirect, url_for
import socket
import time

app = Flask(__name__)

@app.route("/")
def index():
    pod_ip = socket.gethostbyname(socket.gethostname())
    # Show IP address page for 1 second before redirecting
    return render_template('ip_display.html', pod_ip=pod_ip)

@app.route("/main")
def main():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5200)
```

## Part 2: Setup and Deployment

### Installation

1.  **Install Minikube:**
    ```bash
    curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    ```

2.  **Start Minikube:**
    ```bash
    minikube start
    ```

### Building the Docker Image

1.  Navigate to the project directory containing the `Dockerfile`.
2.  Build the Docker image:
    ```bash
    docker build -t restapi:latest .
    ```
3.  Point the local environment to use Minikube's Docker daemon:
    ```bash
    eval $(minikube docker-env)
    ```

### Kubernetes Deployment

1.  **Deployment YAML (`deployment.yaml`):**
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: restapi-deploy
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: restapi
      template:
        metadata:
          labels:
            app: restapi
        spec:
          containers:
          - name: restapi-container
            image: restapi:latest
            imagePullPolicy: Never # For local images
    ```

2.  **Service YAML (`service.yaml`):**
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: restapi-service
    spec:
      selector:
        app: restapi
      ports:
        - port: 80
          targetPort: 5200
      type: NodePort
    ```

3.  **Apply the configurations:**
    ```bash
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    ```

## Part 3: Scaling and Management

### Scaling the Application

To scale the number of Pods, use the `kubectl scale` command:
```bash
kubectl scale deployment restapi-deploy --replicas=3
```

### Inspecting the Cluster

*   **Get all resources:**
    ```bash
    kubectl get all
    ```
*   **Describe a Pod:**
    ```bash
    kubectl describe pod <pod-name>
    ```
*   **Describe a Service:**
    ```bash
    kubectl describe svc restapi-service
    ```

### Kubernetes Dashboard

The Kubernetes dashboard provides a graphical user interface for managing cluster resources.

## Part 4: Adding a Database (MongoDB)

### Deploying MongoDB

A `mongo-stack.yaml` file can be used to deploy MongoDB and Mongo Express (a web-based admin interface).
```bash
kubectl apply -f mongo-stack.yaml
```

### Accessing the Database

Enable the service to access Mongo Express:
```bash
minikube service mongo-express-service
```
This will open the Mongo Express interface in your browser, where you can manage the MongoDB databases.
