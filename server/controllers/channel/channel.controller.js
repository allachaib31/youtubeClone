const channelModel = require("../../models/channel");
const { storage } = require("../../db/firebaseConfig");
const crypto = require("crypto");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

/*const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);*/
exports.addChannel = async (req, res) => {
  const { name, description } = req.body;
  const storageRefProfileImage = ref(
    storage,
    "/uploads/profileImage/" + crypto.randomUUID()
  );
  const storageRefCoverImage = ref(
    storage,
    "/uploads/coverImage/" + crypto.randomUUID()
  );
  try {
    const profileImage = req.files["profileImage"][0];
    const coverImage = req.files["coverImage"][0];
    await uploadBytes(storageRefProfileImage, profileImage.buffer, {
      contentType: profileImage.mimetype,
    });
    await uploadBytes(storageRefCoverImage, coverImage.buffer, {
      contentType: coverImage.mimetype,
    });
    const downloadUrlProfileImage = await getDownloadURL(
      storageRefProfileImage
    );
    const downloadUrlCoverImage = await getDownloadURL(storageRefCoverImage);
    const channel = new channelModel({
      name,
      description,
      profileImage: downloadUrlProfileImage,
      coverImage: downloadUrlCoverImage,
      idUser: req.user.id,
    });
    await channel.save();
    return res.status(200).send({
      status: "success",
      msg: "Congratulations! You've successfully create channel ",
    });
  } catch (err) {
    console.log(err);
    await deleteObject(storageRefProfileImage);
    await deleteObject(storageRefCoverImage);
    return res.status(400).send({
      status: "error",
      msg: "Failde to create channel",
    });
  }
};
exports.updateChannel = async (req, res) => {
  const { name, description, idChannel } = req.body;
  try {
    const channel = await channelModel.findById(idChannel);
    if(channel.idUser != req.user.id){
      return res.status(400).send({
        status: "error",
        message: "You don't have the permission for update this channel"
      });
    }
    channel.name = name;
    channel.description = description;
    await channel.save();
    return res.status(200).send({
      status: "success",
      message: "Congratulation! you've successfully update your channel",
    });
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "Try again!!",
    });
  }
};
exports.updateChannelProfileImage = async (req, res) => {
  const { idChannel } = req.body;
  const storageRefProfileImage = ref(
    storage,
    "/uploads/profileImage/" + crypto.randomUUID()
  );
  try{
    const channel = await channelModel.findById(idChannel);
    if(!channel){
      return res.status(400).send({
        status: "error",
        message: "the channel is not existe!!"
      });
    }
    if(channel.idUser != req.user.id){
      return res.status(400).send({
        status: "error",
        message: "You don't have the permission for update this channel"
      });
    }
    const file = req.file;
    await uploadBytes(storageRefProfileImage, file.buffer, {
      contentType: file.mimetype,
    });
    const downloadUrlProfileImage = await getDownloadURL(
      storageRefProfileImage
    );
    channel.profileImage = downloadUrlProfileImage;
    await channel.save();
    const fileRef = ref(storage, channel.profileImage);
    await deleteObject(fileRef);
    return res.status(200).send({
      status: "success",
      message: "Congratulation! you've successfully update your profileImage"
    })
  }catch(err){
    console.log(err);
    await deleteObject(storageRefProfileImage);
    return res.status(400).send({
      status: "error",
      message: "try again !!"
    });
  }
};
exports.updateChannelCoverImage = async (req, res) => {
  const { idChannel } = req.body;
  const storageRefCoverImage = ref(
    storage,
    "/uploads/coverImage/" + crypto.randomUUID()
  );
  try{
    const channel = await channelModel.findById(idChannel);
    if(!channel){
      return res.status(400).send({
        status: "error",
        message: "the channel is not existe!!"
      });
    }
    if(channel.idUser != req.user.id){
      return res.status(400).send({
        status: "error",
        message: "You don't have the permission for update this channel"
      });
    }
    const file = req.file;
    await uploadBytes(storageRefCoverImage, file.buffer, {
      contentType: file.mimetype,
    });
    const downloadUrlCoverImage = await getDownloadURL(
      storageRefCoverImage
    );
    const fileRef = ref(storage, channel.coverImage);
    await deleteObject(fileRef);
    channel.coverImage = downloadUrlCoverImage;
    await channel.save();
    return res.status(200).send({
      status: "success",
      message: "Congratulation! you've successfully update your profileImage"
    })
  }catch(err){
    console.log(err);
    await deleteObject(storageRefCoverImage);
    return res.status(400).send({
      status: "error",
      message: "try again !!"
    });
  }
};
exports.deleteChannel = async (req, res) => {
  const { idChannel } = req.query;
  try{
    const channel = await channelModel.findById(idChannel);
    if(!channel) {
      return res.status(400).send({
        status: "error",
        message: "the channel is not existe!!"
      });
    }
    if(channel.idUser != req.user.id){
      return res.status(400).send({
        status: "error",
        message: "You don't have the permission for delete this channel"
      });
    }
    const profileImageRef = ref(storage,channel.profileImage);
    const coverImageRef = ref(storage,channel.coverImage);
    await channel.deleteOne();
    await deleteObject(profileImageRef);
    await deleteObject(coverImageRef);
    return res.status(200).send({
      status: "success",
      message: "Congratulation! you've successfully deleted your channel"
    });
  }catch(err){
    return res.status(400).send({
      status: "error",
      message: "try again!!"
    });
  }
};
exports.getChannel = async (req, res) => {};
