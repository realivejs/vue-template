const { spawn } = require("child_process");

function run(command, args, options) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }

  return spawn(command, args, options);
}

module.exports = {
  run,
};
