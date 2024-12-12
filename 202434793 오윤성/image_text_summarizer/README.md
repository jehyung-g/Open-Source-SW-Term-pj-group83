# Image Text Extractor and Summarizer
---
## Project Overview
---
This project extracts text from images and summarizes the extracted text using OpenCV and Hugging Face's Transformers. It is a practical tool for quickly obtaining information from images.

This project is inspired by various tutorials and documentation on OpenCV and natural language processing.

## Key Points
---
### Steps Involved
---
1. Read the input image and preprocess it (convert to grayscale and apply thresholding).
2. Use Tesseract OCR to extract text from the processed image.
3. Summarize the extracted text using Hugging Face's Transformers.
4. Print the extracted text and its summary to the console.

### Assumptions
---
- The input image contains text that is clearly visible and legible.
- The image is preprocessed effectively to enhance text extraction.
## Requirements
---
The following packages are required (with versions I tested on):
- [OpenCV: 4.5.3](https://opencv.org/releases/)
- [pytesseract: 0.3.8](https://github.com/madmaze/pytesseract)
- [transformers: 4.12.0](https://github.com/huggingface/transformers)
- [torch: 1.9.0](https://pytorch.org/get-started/previous-versions/)
- [Pillow: 8.4.0](https://pillow.readthedocs.io/en/stable/releasenotes/8.4.0.html)

## Commands to Run the Detection
---
```bash
python main.py images/sample_image.jpg
```

