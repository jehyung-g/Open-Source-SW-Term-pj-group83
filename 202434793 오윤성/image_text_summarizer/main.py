import cv2
import pytesseract
from transformers import pipeline
import sys

def extract_text(image_path):
    # 이미지 읽기
    image = cv2.imread(image_path)
    # 이미지 전처리 (회색조로 변환)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # 이진화
    _, binary_image = cv2.threshold(gray_image, 150, 255, cv2.THRESH_BINARY_INV)
    # Tesseract를 사용하여 텍스트 추출
    extracted_text = pytesseract.image_to_string(binary_image, lang='eng')
    return extracted_text

def summarize_text(text):
    # Transformers를 사용하여 텍스트 요약
    summarizer = pipeline("summarization")
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return summary[0]['summary_text']

def main(image_path):
    # 텍스트 추출
    text = extract_text(image_path)
    print("추출된 텍스트:")
    print(text)

    # 텍스트 요약
    summary = summarize_text(text)
    print("\n요약된 텍스트:")
    print(summary)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("사용법: python main.py <image-file-path>")
        sys.exit(1)

    image_path = sys.argv[1]
    main(image_path)
