const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const poolCreatorAccount = new ethers.Wallet('0xd2cd126fbd84640fe366dc36ce5b354a5515782a1d064cb82150a5cd3eed78f9', provider);

const factoryABI = [`  function createPool(
    address tokenA,
    address tokenB,
    uint24 fee
  ) external returns (address pool)`];

const factoryInstance = new ethers.Contract('0x1F98431c8aD98523631AE4a59f267346ea31F984', factoryABI, provider);


const deployPool = async () => {
    const tx = await factoryInstance.connect(poolCreatorAccount).createPool('0x6C427a791F75d6eC248ca5A743ADeC1928Fb4243', '0xdAC17F958D2ee523a2206206994597C13D831ec7', 500);
    const receipt = await tx.wait(1);
    console.log(receipt);
  };

deployPool();
