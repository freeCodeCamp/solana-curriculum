FROM ubuntu:20.04

ARG USERNAME=camper
ARG REPO_NAME=solana-curriculum
ARG HOMEDIR=/workspace/$REPO_NAME

ENV TZ="America/New_York"
ENV HOME=/workspace

RUN apt-get update && apt-get install -y sudo

# Unminimize Ubuntu to restore man pages
RUN yes | unminimize

# Set up timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set up user, disable pw, and add to sudo group
RUN adduser --disabled-password \
  --gecos '' ${USERNAME}

RUN adduser ${USERNAME} sudo

RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> \
  /etc/sudoers

# Install packages for projects
RUN sudo apt-get install -y curl git bash-completion man-db htop nano wget

# Install Node LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Rust
RUN sudo apt-get install -y build-essential
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/workspace/.cargo/bin:${PATH}"

# Solana
# RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
RUN wget https://github.com/solana-labs/solana/releases/download/v1.16.9/solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
RUN cd solana-release/
ENV PATH="$PWD/bin:${PATH}"

# /usr/lib/node_modules is owned by root, so this creates a folder ${USERNAME} 
# can use for npm install --global
WORKDIR ${HOMEDIR}
RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'

RUN npm install -g yarn @coral-xyz/anchor-cli@0.30.0

# Configure course-specific environment
COPY . .
WORKDIR ${HOMEDIR}

RUN cd ${HOMEDIR} && npm install

# wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.16_amd64.deb
# sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2.16_amd64.deb
