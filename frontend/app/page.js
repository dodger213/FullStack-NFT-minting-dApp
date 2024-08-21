'use client'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from "axios";
import { Loader } from 'react-loader-spinner'

import { nftContractAddress } from '@/config';
import NFT from '@/utils/EternalNFT.json'

function Home() {
  const [mintedNFT, setMintedNFT] = useState(null);
  const [miningStatus, setMiningStatus] = useState(null);
  const [loadingState, setLoadingState] = useState(0);
  const [txError, setTxError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const sepoliaChainId = "0x10b6b99";
  const devChainId = 1337
  const localhostChainId = `0x${Number(devChainId).toString(16)}`

  //Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log('Got the ethereum Object: ', ethereum)
    } else {
      console.log('No Wallet found. Please connect Wallet')
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) {
      console.log('Found authorized Account: ', accounts[0])
    } else {
      console.log('No authorized account found, please add account to your wallet')
    }
  }

  //Calls metamask to connect wallet on clicking Connect Wallet Button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask not detected! Please install Metamask');
        return
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain: ' + chainId)

      if (chainId !== sepoliaChainId && chainId !== localhostChainId) {
        alert('You are not connected to the Sepolia testnet')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  //Checks if wallet is connected to the correct Network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId !== sepoliaChainId && chainId !== localhostChainId) {
      setIsCorrectNetwork(false);
    } else { setIsCorrectNetwork(true) }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkCorrectNetwork();
  }, [])

  //Creates transaction to mint NFT on clicking Mint Character button
  const mintCharacter = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, NFT.abi, signer)

        let nftTx = await nftContract.createEternalNFT();
        console.log('Mining...', nftTx.hash)
        setMiningStatus(0);
        let tx = await nftTx.wait();
        setLoadingState(1);
        console.log('Mined!', tx);

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`)
        getMintedNFT(tokenId)
      } else {
        console.log("Ethereum object doesn't exit")
      }
    } catch (error) {
      console.log('Error minting character', error)
      setTxError(error.message)
    }
  }

  //Gets the minted NFT data
  const getMintedNFT = async (tokenId) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, NFT.abi, signer);

        let tokenURI = await nftContract.tokenURI(tokenId);
        let data = await axios.get(tokenURI);
        let meta = data.data;

        setMiningStatus(1);
        setMintedNFT(meta.image)
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error);
      setTxError(error.mesage)
    }
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">app/page.js</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Explore starter templates for Next.js.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
    <div className='flex flex-col items-center pt-32 bg-[#0B132B] text-[#d3d3d3] min-h-screen'>
      <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='60'
          height='60'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path d='M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z' />
        </svg>
      </div>
      <h2 className='text-3xl font-bold mb-20 mt-12'>
        Mint your Eternal Domain NFT!
      </h2>
      {currentAccount === '' ? (
        <button
          className='text-2xl font-bold py-3 px-12 bg-black shadow-lg shadow-[#6FFFE9] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : isCorrectNetwork ? (
        <button
          className='text-2xl font-bold py-3 px-12 bg-black shadow-lg shadow-[#6FFFE9] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
          onClick={mintCharacter}
        >
          Mint Character
        </button>
      ) : (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
          <div>----------------------------------------</div>
          <div>Please connect to the Rinkeby Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}

      <div className='text-xl font-semibold mb-20 mt-4'>
        <a
          href={`https://sepolia.rarible.com/collection/${nftContractAddress}`}
          target='_blank'
        >
          <span className='hover:underline hover:underline-offset-8 '>
            View Collection on Rarible
          </span>
        </a>
      </div>
      {loadingState === 0 ? (
        miningStatus === 0 ? (
          txError === null ? (
            <div className='flex flex-col justify-center items-center'>
              <div className='text-lg font-bold'>
                Processing your transaction
              </div>
              <Loader
                className='flex justify-center items-center pt-12'
                type='TailSpin'
                color='#d3d3d3'
                height={40}
                width={40}
              />
            </div>
          ) : (
            <div className='text-lg text-red-600 font-semibold'>{txError}</div>
          )
        ) : (
          <div></div>
        )
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <div className='font-semibold text-lg text-center mb-4'>
            Your Eternal Domain Character
          </div>
          <img
            src={mintedNFT}
            alt=''
            className='h-60 w-60 rounded-lg shadow-2xl shadow-[#6FFFE9] hover:scale-105 transition duration-500 ease-in-out'
          />
        </div>
      )}
    </div>
  );
}

export default Home

