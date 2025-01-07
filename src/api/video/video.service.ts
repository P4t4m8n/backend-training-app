export async function create(uri: string) {
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const data = new FormData();
  data.append("file", {
    uri,
    name: "video.mp4",
    type: "video/mp4",
  } as any); // 'any' used for compatibility with FormData in React Native

  data.append("upload_preset", uploadPreset); // Replace with your Cloudinary preset
  data.append("cloud_name", cloudName); // Replace with your Cloudinary cloud name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    // Save the `result.secure_url` to your database if needed
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}


export const videoService = {
    create,
}