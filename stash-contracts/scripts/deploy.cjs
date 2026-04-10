const hre = require("hardhat");

async function main() {
  const StashWish = await hre.ethers.getContractFactory("StashWish");
  const stashWish = await StashWish.deploy();

  await stashWish.waitForDeployment();

  console.log("Deployed to:", await stashWish.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});