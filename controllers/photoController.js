import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPhoto = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "LensLight",
    }
  );

  console.log("RESULT:::", result);

  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      photographer: res.locals.user._id,
      url: result.secure_url,
      image_id: result.public_id, // Bu id ile görseli cloudinary'den silebileceğiz
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = res.locals.user
      ? await Photo.find({
          photographer: { $ne: res.locals.user._id },
        }) // Kullanıcının kendi yüklediği fotoğraflar hariç tüm fotoğraflar
      : await Photo.find({}); // Tüm fotoğraflar
    res.status(200).render("photos", {
      photos,
      link: "photos",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById({ _id: req.params.id }).populate(
      "photographer"
    );
    res.status(200).render("photo", {
      photo,
      link: "photos",
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const deletePhoto = async (req, res) => {
  try {
    /* const photo = await Photo.findByIdAndDelete({ _id: req.params.id });
    const photo_id = photo.image_id;
    await cloudinary.uploader.destroy(photo_id); */

    const photo = await Photo.findOne({ _id: req.params.id });
    const photoId = photo.image_id;
    await cloudinary.uploader.destroy(photoId);
    await Photo.findOneAndDelete({ _id: req.params.id });
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

export { createPhoto, getAllPhotos, getAPhoto, deletePhoto };
