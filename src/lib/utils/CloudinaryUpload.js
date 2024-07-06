import { cloudinary } from "./cloudinaryConfig";


export const uploadAssetsToCloudinary = (fileUri, fileName, uploadObj) => {

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: uploadObj.type,
        filename_override: fileName,
        folder: uploadObj.folder,
        use_filename: true,
      })
      .then((result) => {
        resolve({ public_id: result.public_id, url: result.url });
      })
      .catch((error) => {
        reject({ success: false, error: error.message });
      });
  });
};

export const deleteAssetsFromCloudinary = async(publicID) => {

  try {
    const result = await cloudinary.uploader.destroy(publicID);

    if (result.result === 'not found') {
      console.error(`Image with public_id ${publicID} not found`);
      return { deleted: false, reason: 'not_found' };
    }

    console.log(`Image with public_id ${publicID} deleted successfully`);
    return { deleted: true };

  } catch (error) {
    console.error(`Error deleting image with public_id ${publicID}:`, error);
    return { deleted: false, reason: 'error', error: error.message };
  }

}