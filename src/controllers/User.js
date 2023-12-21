const { v4: uuidv4 } = require('uuid');
const { User } = require('../../models/User');

const getUserById = async (req, res) => {
  let userId;

  // Check if id is present in the URL params
  if (req.params.id) {
    userId = req.params.id;
  } else {
    // If id is not in params, check the request body
    const { id, username, email } = req.body;

    // Priority: id > username > email
    userId = id || username || email;

    if (!userId) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request. Please provide user id, username, or email',
      });
    }
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User Not Found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error. Cannot find user, please try again later',
    });
  }
};
 

const editProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, newUsername } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User Not Found',
      });
    }

    user.email = email || user.email;
    user.username = newUsername || user.username;

    await user.save();

    return res.status(200).json({
      status: 'success',
      data: {
        email: user.email,
        username: user.username,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error. Cannot update user, please try again later',
    });
  }
};

const changeImage = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    // Delete old image if it exists
    if (user.image) {
      const oldFileName = user.image.replace(
        "https://storage.googleapis.com/ecoloops_bucket/",
        ""
      );
      const blobDelete = bucket.file(oldFileName);

      await blobDelete.delete();
    }

    const id = uuidv4(16);
    const fileName = `user_profile/${id}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ status: "error", message: err });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/nama_bucket/${blob.name}`;
      console.log(publicUrl);

      // Update user image URL in the database
      await user.update({ image: publicUrl });

      res.status(200).json({
        status: "success",
        message: "Image is successfully updated",
        imageUrl: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error. Cannot update user image, please try again later",
    });
  }
};

const checkAuthentication = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User is authenticated',
    data: {
      userId: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};


module.exports = {
  getUserById,
  editProfile,
  changeImage,
  checkAuthentication,
};
