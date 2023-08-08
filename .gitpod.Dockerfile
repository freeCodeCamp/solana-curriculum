FROM gitpod/workspace-full:latest

ARG REPO_NAME=solana-curriculum
ARG HOMEDIR=/workspace/$REPO_NAME

WORKDIR ${HOMEDIR}

RUN bash -c 'VERSION="18" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

RUN sudo apt-get update && sudo apt-get upgrade -y

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
