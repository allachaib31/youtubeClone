const historyModel = require("../../models/history");

exports.getHistory = async (req,res) => {
    const { id } = req.user;
    try {
        const history = await historyModel.find({
            idUser: id
        }).populate("idVideo").sort({ _id: -1 });
        return res.status(200).send({
            msg: "success",
            history
        })
    } catch (error) {
        return res.status(400).send({
            status: "error",
            msg: "try again"
        })
    }
}