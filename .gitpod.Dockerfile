FROM gitpod/workspace-full:latest

RUN bash -c 'VERSION="18" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

RUN sudo apt-get update && sudo apt-get upgrade -y

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
