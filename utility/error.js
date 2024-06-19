module.exports = {
  serverError(err, res) {
    console.error(err);
    res.status(500).json({ message: `server error occurred: ` });
  },

  resorcesError(res, message) {
    res.status(400).json({ message });
  },
};
