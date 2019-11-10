const { inspect } = require("util");
const core = require("@actions/core");
const exec = require("@actions/exec");
const setupPython = require("./src/setup-python");

async function run() {
  try {
    // Allows ncc to find assets to be included in the distribution
    const src = __dirname + "/src";
    core.debug(`src: ${src}`);

    // Setup Python from the tool cache
    setupPython("3.8.0", "x64");

    // Install requirements
    await exec.exec("pip", [
      "install",
      "--requirement",
      `${src}/requirements.txt`
    ]);

    // Fetch action inputs
    const inputs = {
      message: core.getInput("message"),
      sender: core.getInput("sender")
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    // Execute python script
    await exec.exec("python", [
      `${src}/python-action.py`,
      inputs.message,
      inputs.sender
    ]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
