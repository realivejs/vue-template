const { exec } = require("child_process");

function run(command, args, options) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }

  return exec(command, args, options);
}

module.exports = {
  run,
};
