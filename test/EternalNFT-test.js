import { expect } from 'chai';
import pkg from 'hardhat';
const { ethers } = pkg;

describe('EternalNFT', async () => {
  let nft;
  let nftContractAddress;
  let tokenId;

  
  // Deploy the EternalNFT Contract before each test
  beforeEach('Setup Contract', async () => {
    const EternalNFT = await ethers.getContractFactory('EternalNFT');
    nft = await EternalNFT.deploy();
    await nft.deployed();
    nftContractAddress = await nft.address;
  });

  // Tests address for the EternalNFT contract
  it('Should have the contract address', async () => {
    expect(nftContractAddress).to.not.equal('0x0');
    expect(nftContractAddress).to.not.equal('');
    expect(nftContractAddress).to.not.equal(null);
    expect(nftContractAddress).to.not.equal(undefined);
  });

  // Tests the name for token on EternalNFT contract
  it('Should have the name', async () => {
    const name = await nft.collectionName();
    expect(name).to.equal('EternalNFT');
  });

  // Tests the symbol for token on EternalNFT contract
  it('Should have the symbol', async () => {
    const symbol = await nft.collectionSymbol();
    expect(symbol).to.equal('ENFT');
  });

  // Tests for NFT minting function
  it('Should be able to mint NFT', async () => {
    // Mints the first NFT
    let txn = await nft.createEternalNFT();
    let tx = await txn.wait();
    // tokenId of the minted NFT
    let event = tx.events[0];
    let value = event.args[2];
    tokenId = value.toNumber();
    expect(tokenId).to.equal(0);
    // Mints the second NFT
    txn = await nft.createEternalNFT();
    tx = await txn.wait();
    // tokenId of minted NFT secondly
    event = tx.events[0];
    value = event.args[2];
    tokenId = value.toNumber();
    expect(tokenId).to.equal(1);
  });
});