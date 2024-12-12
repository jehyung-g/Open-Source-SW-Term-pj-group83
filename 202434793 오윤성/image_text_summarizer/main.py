import cv2
import pytesseract
from transformers import pipeline

def extract_text(image_path):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Image not found or unable to load: {image_path}")

    # Preprocess the image
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    binary_image = cv2.threshold(gray_image, 150, 255, cv2.THRESH_BINARY_INV)[1]  # Binarization

    # Extract text
    extracted_text = pytesseract.image_to_string(binary_image, lang='eng')

    # Correct the university location
    extracted_text = correct_university_location(extracted_text)

    # Print the extracted text
    print("Extracted Text:", extracted_text)
    return extracted_text

def correct_university_location(extracted_text):
    # Replace incorrect location with the correct one
    if "Gachon University" in extracted_text:
        extracted_text = extracted_text.replace("Japan", "South Korea")
    return extracted_text

# Summarizer initialization with a specific model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Example usage
image_path = "C:\\Users\\sung\\anaconda3\\envs\\oss\\image_text_summarizer\\images\\sample_image.jpg"
text = extract_text(image_path)
summary = summarizer(text, max_length=130)
print("Summarized Text:", summary)
