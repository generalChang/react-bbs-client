const cut_str = (str, length = 10) => {
  return str.length > length ? str.substr(0, length) + "..." : str;
};

export default cut_str;
