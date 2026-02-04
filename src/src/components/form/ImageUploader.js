// src/components/form/ImageUploader.js
import styled from "styled-components"
import { useState, useRef } from "react"
import { uploadToCloudinary } from "../../utils/cloudinary"
import toast from "react-hot-toast"

const UploaderContainer = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.8rem;
`

const DropZone = styled.div`
  border: 2px dashed
    ${(props) => (props.isDragging ? props.theme.primary : props.theme.border)};
  background: ${(props) =>
    props.isDragging ? props.theme.surface : props.theme.inputBg};
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: ${(props) => props.theme.cardRadius};

  &:hover {
    border-color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.surface};
  }
`

const DropIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`

const DropText = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`

const DropSubtext = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.8rem;
`

const HiddenInput = styled.input`
  display: none;
`

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: calc(${(props) => props.theme.cardRadius} / 2);
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.border};
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(244, 67, 54, 0.9);
    transform: scale(1.1);
  }
`

const UploadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`

function ImageUploader({
  label,
  images = [],
  onImagesChange,
  maxImages = 10,
  uploadPreset = "wedding_content",
  projectSlug,
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadingImages, setUploadingImages] = useState([])
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    )

    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = async (files) => {
    if (images.length + files.length > maxImages) {
      toast.error(`Maximal ${maxImages} Bilder erlaubt`)
      return
    }

    // Add temporary previews
    const tempPreviews = files.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      uploading: true,
      file,
    }))

    setUploadingImages((prev) => [...prev, ...tempPreviews])

    // Upload each file
    for (const preview of tempPreviews) {
      try {
        const result = await uploadToCloudinary(
          preview.file,
          uploadPreset,
          projectSlug,
        )

        // Remove from uploading, add to images
        setUploadingImages((prev) => prev.filter((p) => p.id !== preview.id))
        onImagesChange([...images, result.url])

        // Revoke object URL
        URL.revokeObjectURL(preview.url)

        toast.success("Bild hochgeladen!")
      } catch (error) {
        console.error("Upload error:", error)
        toast.error("Upload fehlgeschlagen")
        setUploadingImages((prev) => prev.filter((p) => p.id !== preview.id))
      }
    }
  }

  const handleRemove = (indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove)
    onImagesChange(newImages)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <UploaderContainer>
      {label && <Label>{label}</Label>}

      <DropZone
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <DropIcon>📷</DropIcon>
        <DropText>Bilder hierher ziehen oder klicken</DropText>
        <DropSubtext>
          JPG, PNG oder WebP • Max. {maxImages} Bilder • Max. 10 MB pro Bild
        </DropSubtext>
      </DropZone>

      <HiddenInput
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        multiple
        onChange={handleFileSelect}
      />

      {(images.length > 0 || uploadingImages.length > 0) && (
        <PreviewGrid>
          {images.map((url, index) => (
            <PreviewItem key={url}>
              <PreviewImage src={url} alt={`Bild ${index + 1}`} />
              <RemoveButton onClick={() => handleRemove(index)}>×</RemoveButton>
            </PreviewItem>
          ))}

          {uploadingImages.map((preview) => (
            <PreviewItem key={preview.id}>
              <PreviewImage src={preview.url} alt='Uploading...' />
              <UploadingOverlay>Lädt hoch...</UploadingOverlay>
            </PreviewItem>
          ))}
        </PreviewGrid>
      )}
    </UploaderContainer>
  )
}

export default ImageUploader
