const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary env missing");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "resumes");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Cloudinary upload failed:", err);
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    console.log("CLOUDINARY URL:", data.secure_url); // debug

    return data.secure_url;

  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};

