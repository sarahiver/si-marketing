// src/utils/cloudinary.js
import imageCompression from "browser-image-compression"

export async function uploadToCloudinary(file, preset, projectSlug) {
  // 1. Komprimieren
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  })

  // 2. Upload zu Cloudinary
  const formData = new FormData()
  formData.append("file", compressedFile)
  formData.append("upload_preset", preset)
  formData.append(
    "folder",
    `weddings/${preset.replace("wedding_", "")}/${projectSlug}`
  )

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error("Upload fehlgeschlagen")
  }

  const data = await response.json()

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  }
}

export function getOptimizedUrl(originalUrl, options = {}) {
  const {
    width = 1920,
    height = 1080,
    quality = "auto:good",
    format = "auto",
  } = options

  const transformation = `f_${format},q_${quality},w_${width},h_${height},c_limit`

  return originalUrl.replace("/upload/", `/upload/${transformation}/`)
}
