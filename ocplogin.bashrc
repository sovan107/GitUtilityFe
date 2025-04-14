#!/bin/bash
# =======================================================
# .bashrc Configuration for OpenShift Operations
# =======================================================
#
# NOTE: Since you're using zsh on MacOS, you may want to copy these
# configurations to your ~/.zshrc file or source this file from there
# by adding: source ~/.bashrc
#
# To apply changes immediately: source ~/.bashrc

# =======================================================
# PATH Configuration
# =======================================================
# Add the directory containing ocp-login.sh to your PATH
# Assuming ocp-login.sh is in your home directory
export PATH="$PATH:$HOME"

# =======================================================
# OpenShift Environment Variables
# =======================================================
# Default OpenShift server URL
export OCP_SERVER="https://api.rm1.0a51.p1.openshiftapps.com:6443"

# Default project namespace
export OCP_PROJECT="sovan-misra-dev"

# Token file location
export OCP_TOKEN_FILE="$HOME/.ocp-token"

# =======================================================
# OpenShift Aliases
# =======================================================
# Quick login with saved token
alias ocplogin='$HOME/ocp-login.sh -s $OCP_SERVER'

# Login with token from file if it exists
alias ocptoken='[[ -f $OCP_TOKEN_FILE ]] && $HOME/ocp-login.sh -s $OCP_SERVER -t "$(cat $OCP_TOKEN_FILE)" || echo "No token file found at $OCP_TOKEN_FILE"'

# Login and switch to default project
alias ocpdev='$HOME/ocp-login.sh -s $OCP_SERVER -p $OCP_PROJECT'

# Common OpenShift commands
alias ocpstatus='oc status'
alias ocpproj='oc project'
alias ocpprojs='oc projects'
alias ocppods='oc get pods'
alias ocpnodes='oc get nodes'
alias ocpsvc='oc get svc'
alias ocpdeploy='oc get deployments'
alias ocpall='oc get all'
alias ocpdesc='oc describe'
alias ocplogs='oc logs'
alias ocpwatch='oc get pods -w'
alias ocpreset='oc config use-context "$(oc config get-contexts -o name | grep $OCP_SERVER | head -n1)"'

# =======================================================
# OpenShift Functions
# =======================================================

# Function to switch OpenShift projects quickly
ocpp() {
  if [ -z "$1" ]; then
    oc project
  else
    oc project "$1"
  fi
}

# Function to describe a pod by partial name
ocpdp() {
  if [ -z "$1" ]; then
    echo "Usage: ocpdp <pod-name-partial>"
    return 1
  fi
  
  POD=$(oc get pods | grep "$1" | awk '{print $1}' | head -n1)
  
  if [ -z "$POD" ]; then
    echo "No pod matching '$1' found."
    return 1
  fi
  
  oc describe pod "$POD"
}

# Function to get logs from a pod by partial name
ocplp() {
  if [ -z "$1" ]; then
    echo "Usage: ocplp <pod-name-partial> [container-name]"
    return 1
  fi
  
  POD=$(oc get pods | grep "$1" | awk '{print $1}' | head -n1)
  
  if [ -z "$POD" ]; then
    echo "No pod matching '$1' found."
    return 1
  fi
  
  if [ -z "$2" ]; then
    oc logs "$POD"
  else
    oc logs "$POD" -c "$2"
  fi
}

# Function to SSH into a pod by partial name
ocpexec() {
  if [ -z "$1" ]; then
    echo "Usage: ocpexec <pod-name-partial> [command]"
    return 1
  fi
  
  POD=$(oc get pods | grep "$1" | awk '{print $1}' | head -n1)
  
  if [ -z "$POD" ]; then
    echo "No pod matching '$1' found."
    return 1
  fi
  
  if [ -z "$2" ]; then
    oc exec -it "$POD" -- /bin/sh -c "bash || sh"
  else
    oc exec -it "$POD" -- /bin/sh -c "$2"
  fi
}

# Function to display all resources in a project
ocpls() {
  local NS=${1:-$(oc project -q)}
  echo "Deployments in $NS:"
  oc get deployments -n "$NS"
  echo -e "\nPods in $NS:"
  oc get pods -n "$NS"
  echo -e "\nServices in $NS:"
  oc get svc -n "$NS"
  echo -e "\nRoutes in $NS:"
  oc get routes -n "$NS"
  echo -e "\nConfigMaps in $NS:"
  oc get configmaps -n "$NS"
  echo -e "\nSecrets in $NS:"
  oc get secrets -n "$NS"
}

# Function to quickly create a port-forward to a service
ocpfwd() {
  if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ocpfwd <service-name> <local-port>:<remote-port>"
    return 1
  fi
  
  echo "Starting port forward from localhost:$2 to service $1"
  oc port-forward svc/"$1" "$2"
}

# Function to set the current context based on environment variables
ocpset() {
  if [ -z "$1" ]; then
    echo "Usage: ocpset <environment>"
    echo "Available environments:"
    echo "  dev  - Development environment"
    echo "  test - Test environment"
    echo "  prod - Production environment"
    return 1
  fi
  
  case "$1" in
    dev)
      export OCP_SERVER="https://api.rm1.0a51.p1.openshiftapps.com:6443"
      export OCP_PROJECT="sovan-misra-dev"
      ;;
    test)
      export OCP_SERVER="https://api.your-test-cluster.example.com:6443"
      export OCP_PROJECT="sovan-misra-test"
      ;;
    prod)
      export OCP_SERVER="https://api.your-prod-cluster.example.com:6443"
      export OCP_PROJECT="sovan-misra-prod"
      ;;
    *)
      echo "Unknown environment: $1"
      return 1
      ;;
  esac
  
  echo "Environment set to $1:"
  echo "  Server: $OCP_SERVER"
  echo "  Project: $OCP_PROJECT"
}

# Display a welcome message with OpenShift configuration
echo "OpenShift CLI environment configured:"
echo "  Server: $OCP_SERVER"
echo "  Project: $OCP_PROJECT"
echo "  Script: $HOME/ocp-login.sh"
echo "Use 'ocplogin' to authenticate to OpenShift."
