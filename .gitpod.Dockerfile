FROM gitpod/workspace-full:2023-08-29-11-00-25

ARG REPO_NAME=solana-curriculum
ARG HOMEDIR=/workspace/$REPO_NAME

WORKDIR ${HOMEDIR}

RUN bash -c 'VERSION="18" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

RUN sudo apt-get update && sudo apt-get upgrade -y

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.16.11/install)"
# RUN wget https://github.com/solana-labs/solana/releases/download/v1.16.9/solana-release-x86_64-unknown-linux-gnu.tar.bz2
# RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
# RUN cd solana-release/
# ENV PATH="$PWD/bin:${PATH}"

RUN npm i -g @coral-xyz/anchor-cli@0.28.0