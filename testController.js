exports.getTest = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend and MySQL connection logic is ready!"
    });
};