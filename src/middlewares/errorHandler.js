module.exports = (err, req, res, next) => {
    console.error("🔥 ERROR:", err.message);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
};