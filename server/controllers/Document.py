import tensorflow as tf
import numpy as np
from PIL import Image
import pytesseract
import cv2

class DocumentVerificationModel:
    def _init_(self):
        # Initialize pre-trained models for document classification and OCR
        self.document_classifier = tf.keras.models.Sequential([
            tf.keras.layers.Conv2D(32, 3, activation='relu', input_shape=(224, 224, 3)),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(64, 3, activation='relu'),
            tf.keras.layers.MaxPooling2D(),
            tf.keras.layers.Conv2D(64, 3, activation='relu'),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(2, activation='softmax')  # 2 classes: Aadhaar and PAN
        ])
        
        # Add custom OCR processors for each document type
        self.aadhaar_processor = AadhaarProcessor()
        self.pan_processor = PANProcessor()

    def preprocess_image(self, image):
        # Convert to RGB if needed
        if len(image.shape) == 2:
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            
        # Resize to standard input size
        image = cv2.resize(image, (224, 224))
        
        # Normalize pixel values
        image = image / 255.0
        return image

    def verify_document(self, image_path):
        # Load and preprocess image
        image = cv2.imread(image_path)
        processed_image = self.preprocess_image(image)
        
        # Classify document type
        doc_type_pred = self.document_classifier.predict(np.array([processed_image]))
        doc_type = "aadhaar" if doc_type_pred[0][0] > 0.5 else "pan"
        
        # Process according to document type
        if doc_type == "aadhaar":
            return self.aadhaar_processor.verify(image)
        else:
            return self.pan_processor.verify(image)

class AadhaarProcessor:
    def _init_(self):
        # Initialize Aadhaar-specific OCR and verification rules
        self.aadhaar_pattern = r'\d{4}\s\d{4}\s\d{4}'
        
    def verify(self, image):
        # Extract text using OCR
        text = pytesseract.image_to_string(image)
        
        # Verify Aadhaar number format
        aadhaar_number = self.extract_aadhaar_number(text)
        if not aadhaar_number:
            return {"verified": False, "error": "Invalid Aadhaar number format"}
            
        # Verify other Aadhaar card elements
        verification_results = {
            "document_type": "aadhaar",
            "verified": True,
            "aadhaar_number": aadhaar_number,
            "name": self.extract_name(text),
            "dob": self.extract_dob(text),
            "confidence_score": self.calculate_confidence(text)
        }
        
        return verification_results
    
    def extract_aadhaar_number(self, text):
        # Implementation of Aadhaar number extraction and validation
        import re
        matches = re.findall(self.aadhaar_pattern, text)
        return matches[0] if matches else None

class PANProcessor:
    def _init_(self):
        # Initialize PAN-specific OCR and verification rules
        self.pan_pattern = r'[A-Z]{5}[0-9]{4}[A-Z]{1}'
        
    def verify(self, image):
        # Extract text using OCR
        text = pytesseract.image_to_string(image)
        
        # Verify PAN number format
        pan_number = self.extract_pan_number(text)
        if not pan_number:
            return {"verified": False, "error": "Invalid PAN number format"}
            
        # Verify other PAN card elements
        verification_results = {
            "document_type": "pan",
            "verified": True,
            "pan_number": pan_number,
            "name": self.extract_name(text),
            "father_name": self.extract_father_name(text),
            "dob": self.extract_dob(text),
            "confidence_score": self.calculate_confidence(text)
        }
        
        return verification_results
    
    def extract_pan_number(self, text):
        # Implementation of PAN number extraction and validation
        import re
        matches = re.findall(self.pan_pattern, text)
        return matches[0] if matches else None