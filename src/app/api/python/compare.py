import os
import sys
import face_recognition
from PIL import Image

# Define directories
uploaded_image_dir = sys.argv[1]  # Take the uploaded image as an argument
images_dir = '/home/rogue/Desktop/Final_year_project/public/criminalImages'

# Adjust tolerance (lower = stricter, higher = more lenient)
TOLERANCE = 0.4


def load_image(image_path):
    """Load an image file for face recognition."""
    return face_recognition.load_image_file(image_path)


def encode_face(image_path):
    """Encode all faces in the image and return their encodings."""
    image = load_image(image_path)
    face_encodings = face_recognition.face_encodings(image)

    if face_encodings:  # Check if any face was detected
        return face_encodings  # Return list of face encodings
    return None  # Return None if no face was detected


def compare_faces(uploaded_image_path, images_dir):
    """Compare the uploaded image with all images in the given directory."""
    uploaded_face_encodings = encode_face(uploaded_image_path)

    if uploaded_face_encodings is None:
        return "No face detected in the uploaded image."

    closest_match = None
    closest_distance = float("inf")

    # Loop through images in the directory
    for image_file in os.listdir(images_dir):
        image_path = os.path.join(images_dir, image_file)
        known_face_encodings = encode_face(image_path)

        if known_face_encodings is None:
            continue

        # Compare uploaded face with all known faces in the current image
        for known_face_encoding in known_face_encodings:
            # Compute the face distance (similarity score)
            face_distances = face_recognition.face_distance(
                [known_face_encoding], uploaded_face_encodings[0])

            # Get the closest match based on the smallest distance
            if face_distances[0] < closest_distance and face_distances[0] <= TOLERANCE:
                closest_distance = face_distances[0]
                closest_match = image_file

    if closest_match:
        return closest_match
    else:
        return "No match found."


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python compare_faces.py <uploaded_image_path>")
    else:
        match = compare_faces(uploaded_image_dir, images_dir)
        print(match)
