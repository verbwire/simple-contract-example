import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const Post = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [blockExplorerLink, setBlockExplorerLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(e) {
        setIsSubmitting(true);
        e.preventDefault();
        const postData = async () => {
            const data = {
                walletAddress: walletAddress,
            };

            const response = await fetch("/api/mint", {
                method: "POST",
                body: JSON.stringify(data),
            }).catch(function (error) {
                console.log("Error: ", error);
            });
            return response.json();
        };
        postData().then((data) => {

            if (data.response && data.response.transaction_details) {
                if (data.response.transaction_details.transactionID !== undefined) {
                    setTransactionId(data.response.transaction_details.transactionID);
                }
                if (data.response.transaction_details.transactionHash) {
                    setTransactionHash(data.response.transaction_details.transactionHash);
                }
                if (data.response.transaction_details.blockExplorer) {
                    setBlockExplorerLink(data.response.transaction_details.blockExplorer);
                }
            } else  {
                if(data.error) {
                    setError(data.error.message);
                }
            }
            setIsSubmitting(false);
        });
    }

    function checkTransactionDetails(e) {
        e.preventDefault();
        const postData = async () => {
            const data = {
                transactionId: transactionId,
            };

            const response = await fetch("/api/transactionDetails", {
                method: "POST",
                body: JSON.stringify(data),
            });
            return response.json();
        };
        postData().then((data) => {
            alert(data.message);
        });
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <Head>
                    <title>Mint a Verbwire NFT</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">


                    <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">



                        <div className="max-w-sm rounded overflow-hidden shadow-lg">

                            <div className="px-6 py-4 pb-12">
                                <h1 className="text-3xl font-bold mt-4 mb-9">
                                    Welcome to{' '}
                                    <a className="text-blue-600" href="https://verbwire.com">
                                        Verbwire!
                                    </a>
                                </h1>
                                <form className="w-full max-w-sm mt-12 pt-9 pb-9" onSubmit={handleSubmit}>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/2">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                   htmlFor="inline-full-name">
                                                Destination Wallet
                                            </label>
                                        </div>

                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name" type="text" placeholder="0x..." value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />

                                    </div>

                                    <button
                                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-xl disabled:opacity-25"
                                        type="submit" disabled={isSubmitting}>
                                        Mint
                                    </button>
                                    {isSubmitting ?
                                        <>
                                            <div className="text-center mt-8">
                                                <div role="status">
                                                    <svg aria-hidden="true"
                                                         className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                         viewBox="0 0 100 101" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"/>
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"/>
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>
                                    }




                                </form>



                                {transactionId ?
                                    <>
                                        <p className="text-gray-700 text-base mt-9 break-words">
                                            <span><strong>Verbwire Transaction ID</strong>:</span><br/>
                                            <span>{transactionId}</span>
                                        </p>
                                        <p className="text-gray-700 text-base mt-6 break-words">
                                            <span><strong>Blockchain Transaction Hash</strong>:</span><br/>
                                            <span>{transactionHash}</span>
                                        </p>
                                        <a href={blockExplorerLink}>
                                            <button
                                                className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm mt-6">
                                                View Block Explorer
                                            </button>
                                        </a>
                                        <button
                                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm mt-6 ml-4 mr-4"
                                            onClick={function(event) {
                                                checkTransactionDetails(event);
                                            }}>
                                            Transaction Details
                                        </button>
                                    </>
                                    :
                                    <></>
                                }
                                {error}

                            </div>

                        </div>

                    </div>
                </main>

                <footer className="flex h-24 w-full items-center justify-center border-t">
                    <a
                        className="flex items-center justify-center gap-2"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <Image src="/Verbwire Logo Black.svg" alt="Vercel Logo" width={200} height={50} />
                    </a>
                </footer>
            </div>

        </>

    );
};

export default Post;