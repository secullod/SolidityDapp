const projectGenerator = artifacts.require("projectGenerator");

module.exports = async function (deployer) {
  await deployer.deploy(projectGenerator);
};
