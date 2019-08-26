const attachDbToThis = (req, res, next) => {
    this.db = req.app.get('db');
    next();
}

module.exports = attachDbToThis;