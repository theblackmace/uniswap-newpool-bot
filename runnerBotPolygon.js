const {ethers} = require('ethers');
const {TwitterApi} = require('twitter-api-v2');

const provider = new ethers.providers.JsonRpcProvider('https://polygon.llamarpc.com');
const factoryABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":true,"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"FeeAmountEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":false,"internalType":"int24","name":"tickSpacing","type":"int24"},{"indexed":false,"internalType":"address","name":"pool","type":"address"}],"name":"PoolCreated","type":"event"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"enableFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"","type":"uint24"}],"name":"feeAmountTickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint24","name":"","type":"uint24"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"parameters","outputs":[{"internalType":"address","name":"factory","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const factoryInstance = new ethers.Contract('0x1F98431c8aD98523631AE4a59f267346ea31F984', factoryABI, provider);
let poolArr = [];

const runBot = () => {
    console.log('Polygon Bot instance running.....');

    factoryInstance.on('PoolCreated', (token0, token1, fee, tickSpacing, pool) => {
        console.log('Pool Created');
        poolArr = [token0, token1, fee, tickSpacing, pool];
        tweet();
    });
}

runBot();

const client = new TwitterApi({
    appKey: '36GMxJny5aLDcrcBxaQ4ifQUq',
    appSecret: 'JLaAKMFSXT0kjXcZPaU2WtRyrxHCZRLyYU6aMzDRh6yIi3rgJT',
    accessToken: '1653735574639869952-cbbWTOkWJCHH3iYtm7IvMz2yShc0Nh',
    accessSecret: 'TR4sZLNoLv9BxyUFtr1nSqGShvjutSFPKT4VWXO2Cfak1'
});



const rwClient = client.readWrite;

const tweet = async () => {
    console.log('Tweeting....');

    const tweetText = 
    `A new liquidity pool was created using the Uniswap v3 Factory on Polygon 🦄
    Pool: https://polygonscan.com/address/${poolArr[4]}
    Fee: ${poolArr[2]/10000}%
    Follow to get regular updates on new liquidity pools created through the Uniswap v3 Router 👇`;

    try {
        const reciept = await rwClient.v2.tweet(tweetText);
        console.log(reciept);
    } catch(error) {
        console.log(error);
    }
}

