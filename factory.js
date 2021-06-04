import web3 from "./web3";
import Account from "./build/contracts/projectGenerator.json";

const instance = new web3.eth.Contract(
  Account.abi,
  "0x916837Bc9Cb32762af4d156F9cdc2D8b90548548"
);

export default instance;
