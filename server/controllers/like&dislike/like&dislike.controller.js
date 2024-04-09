const likeModel = require("../../models/like");
const dislikeModel = require("../../models/dislikes");
const videoModel = require("../../models/video");

exports.like = async (req, res) => {
    const { idVideo } = req.body;
    const { id } = req.user;
    try {
        const like = await likeModel.findOne({
            idUser: id,
            idVideo: idVideo
        }).populate("idVideo");
        const video = await videoModel.findById(idVideo);
        if(!like) {
            if(!video){
                return res.status(404).send({
                    status: "error",
                    msg: "the video is not existe"
                })
            }
            await new likeModel({
                idVideo: idVideo,
                idUser: id
            }).save();
            video.likes++;
            await video.save();
            return res.status(200).send({
                status: "success",
                msg: "add like"
            })
        }
        await like.deleteOne();
        video.likes--;
        await video.save();
        return res.status(200).send({
            status: "success",
            msg: "delete like"
        })

    } catch (err) {
        return res.status(400).send({
            status: "error",
            message: "try again!!",
        });
    }
}

exports.dislike = async (req,res) => {
    const { idVideo } = req.body;
    const { id } = req.user;
    try {
        const like = await dislikeModel.findOne({
            idUser: id,
            idVideo: idVideo
        }).populate("idVideo");
        const video = await videoModel.findById(idVideo);
        if(!like) {
            if(!video){
                return res.status(404).send({
                    status: "error",
                    msg: "the video is not existe"
                })
            }
            await new dislikeModel({
                idVideo: idVideo,
                idUser: id
            }).save();
            video.dislikes++;
            await video.save();
            return res.status(200).send({
                status: "success",
                msg: "add dislikes"
            })
        }
        await dislikeModel.deleteOne();
        video.dislikes--;
        await video.save();
        return res.status(200).send({
            status: "success",
            msg: "delete dislikes"
        })

    } catch (err) {
        return res.status(400).send({
            status: "error",
            message: "try again!!",
        });
    }
}