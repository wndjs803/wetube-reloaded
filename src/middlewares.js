import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_ID_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "lemina",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "lemina",
  acl: "public-read",
});

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "upload/avatars/",
  limits: { fileSize: 3000000 },
  storage: s3ImageUploader,
});

export const videoUpload = multer({
  dest: "upload/videos/",
  limits: { fileSize: 10000000 },
  storage: s3VideoUploader,
});
