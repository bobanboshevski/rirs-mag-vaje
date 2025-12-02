const getExample = (req, res) => {
    res.json({message: 'Hello from Express!'});
};

module.exports = {getExample};