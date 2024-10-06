import os
import face_recognition
from PIL import Image

# Define directories
uploaded_image_dir = '../../../public/uploaded'
images_dir = '../../../public/pictures'


def load_image(image_path):
    """Load an image file for face recognition."""
    return face_recognition.load_image_file(image_path)


def encode_face(image_path):
    """Encode the face in the image."""
    image = load_image(image_path)
    face_encodings = face_recognition.face_encodings(image)
    if face_encodings:  # Check if any face was detected
        return face_encodings[0]  # Return the first face encoding
    return None  # Return None if no face was detected


def compare_faces(uploaded_image_path, images_dir):
    """Compare the uploaded image with a list of images in the given directory."""
    # Encode the uploaded image face
    uploaded_face_encoding = encode_face(uploaded_image_path)

    # If no face encoding is returned, the uploaded image has no detectable face
    if uploaded_face_encoding is None:
        print("No face detected in the uploaded image.")
        return None

    # Loop through images in the images directory
    for image_file in os.listdir(images_dir):
        image_path = os.path.join(images_dir, image_file)
        known_face_encoding = encode_face(image_path)

        # If no face encoding in the current image, skip this image
        if known_face_encoding is None:
            print(f"No face detected in {image_file}, skipping...")
            continue

        # Compare faces
        result = face_recognition.compare_faces(
            [known_face_encoding], uploaded_face_encoding)

        if result[0]:  # If there's a match, return the image file name
            print(f"Match found with: {image_file}")
            return image_file

    # If no match is found after looping through all images
    print("No match found.")
    return None


if __name__ == "__main__":
    # Assuming you want to compare the uploaded image named 'uploaded_image.jpg'
    uploaded_image_path = os.path.join(uploaded_image_dir, 'Test_talha.jpg')
    match = compare_faces(uploaded_image_path, images_dir)

    if match:
        print(f"Matched with {match}")
    else:
        print("No match found")
