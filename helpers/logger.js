module.exports = {
  info(content) {
    if (content instanceof Object) {
      console.log(JSON.stringify(content, null, 2));
    } else {
      console.log(content);
    }
  },
};
