# FullStack-NFT-minting-dApp

A full stack dApp starter for minting NFTs built on Ethereum (Solidity) with Next.js (React).

## Table of Contents
  - [Deployed Website url](#deployed-website-url)
  - [Deployed Contract Address](#deployed-contract-address)
  - [Project Description](#project-description)
  - [Workflow](#workflow)
  - [Directory structure](#directory-structure)
  - [Clone, Install and Build steps](#clone-install-and-build-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning and installing dependencies](#cloning-and-installing-dependencies)
    - [Testing Contracts](#testing-contracts)
    - [Running the frontend](#running-the-frontend)


## Deployed Website url

https://eternal-nft.vercel.app/

## Deployed Contract Address

0x9b6dd9b898c300037c8C245e8E619a0934158065

## Project Description

A dapp to mint your own text-based **Eternal Character NFT**.

**Eternal Characters** are the residents of **Eternal Domain world**. They consist of 3 main characteristics, Area of Control, Weapon and Rank.

**Area of Control -** Fire, Wind, Wave, Earth, Light, Shadow, Thunder, Space, Time, Gravity, Ice
**Weapon -** Sword, Spear, Shield, Hammer, Saber, Axe, Bow, Staff, Wand, Fist, Dagger, Scythe, Mace, Blade, Katana
**Rank -** Lord, King, Emperor, Venerable, Ancestor, Saint, God

## Workflow

1. Enter the dApp and connect the wallet to rinkeby network.
2. Click on the Mint Character button.
3. Metamask pops up and asks to confirm the transaction.
4. After the transaction is successfully processed the user can see the minted character.
5. The minted character is also added to My NFT page under Minted Characters section.

## Directory structure

```
EternalNFT
┣ frontend
┃ ┣ app
┃ ┃ ┃ favicon.ico 
┃ ┃ ┃ globals.css
┃ ┃ ┃ layout.js
┃ ┃ ┗ page.js
┃ ┣ public
┃ ┃ ┃ next.svg
┃ ┃ ┃ screenshot.png
┃ ┃ ┗ vercel.svg
┃ ┣ utils
┃ ┃ ┗ EternalNFT.json
┃ ┣ .gitignore
┃ ┣ README.md
┃ ┣ config.js
┃ ┣ package-lock.json
┃ ┣ package.json
┃ ┣ postcss.config.js
┃ ┗ tailwind.config.js
┣ contracts
┃ ┣ libraries
┃ ┃ ┗ Base64.sol
┃ ┗ EternalNFT.sol
┣ scripts
┃ ┗ deploy.js
┣ test
┃ ┗ EternalNFT-test.js
┣ .gitignore
┣ README.md
┣ hardhat.config.js
┣ package-lock.json
┗ package.json
```

## Clone, Install and Build steps

### Prerequisites

1. [Git](https://git-scm.com/)
2. [Node JS](https://nodejs.org/en/) (everything was installed and tested under v15.12.0)
3. A Browser with the [MetaMask extension](https://metamask.io/) installed.
4. Test Ether on the Rinkeby network.

<br>

### Cloning and installing dependencies

1. Clone the project repository on your local machine

```
 git clone https://github.com/dodger213/FullStack-NFT-minting-dApp.git
 cd FullStack-NFT-minting-dApp
```

2. Installing dependencies

- For contracts -
  ```
  npm install
  ```
- For client -
  ```
  cd client
  npm install
  ```

### Testing Contracts

For testing contracts run command:

```
npx hardhat test
```

### Running the frontend

For running frontend locally run command:

```
cd client
npm run dev
```

### Environment variables (not needed for running project locally)

```
ALCHEMY_RINKEBY_URL =
ACCOUNT_KEY =
```
