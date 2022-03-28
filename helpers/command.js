const execa = require("execa");

function run(command, args, options) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }

  return execa(command, args, options);
}

module.exports = {
  run,
};
