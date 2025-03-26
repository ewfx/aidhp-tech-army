from fastapi import FastAPI, HTTPException
import requests
import time
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:3000"],  # Allow requests from Angular
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Ensure all methods (GET, POST, etc.) are allowed
    allow_headers=["*"],
)

# Mistral API Details
API_KEY = "CTKrqDp4cvFk3ttN9mDLWLqSBAQju9Z7"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

class UserData(BaseModel):
    Age: int
    Gender: str
    City: str
    State: str
    Country: str
    MaritalStatus: str
    Education: str
    Occupation: str
    Income: int
    Interests: str
    PurchasedProducts: str

class BankingData(BaseModel):
    Age: int
    MaritalStatus: str
    Income: int
    Interests: str

class ContentData(BaseModel):
    Age: int
    MaritalStatus: str
    Occupation: str
    Interests: str

@app.post("/recommendProducts")
def generate_product_recommendation_prompt(user_data: UserData):
    prompt = f"""
        Customer Profile:
        - Age: {user_data.Age}
        - Gender: {user_data.Gender}
        - Location: {user_data.City}, {user_data.State}, {user_data.Country}
        - Marital Status: {user_data.MaritalStatus}
        - Education: {user_data.Education}
        - Occupation: {user_data.Occupation}
        - Income: {user_data.Income}
        - Interests: {user_data.Interests}
        - Purchased Products: {user_data.PurchasedProducts}

        Suggest 3 new products for this customer. Only list the product names.
        Do not include brand names in the product names. 
        For example, if your suggestion for the user is to get AMEX Black card, suggest him to get a premium credit card.
    """
    return {"recommendations": get_recommendation(prompt)}

@app.post("/banking-recommend")
def banking_recommend(user_data: BankingData):
    prompt = f"""
    Customer Profile:
    - Age: {user_data.Age}
    - Marital Status: {user_data.MaritalStatus}
    - Income: {user_data.Income}
    - Interests: {user_data.Interests}

    Based on the customer's financial profile, recommend 3 suitable banking solutions. Only list the solution names, no justification needed.
    """
    return {"recommendations": get_recommendation(prompt)}

# API for Content Recommendations
@app.post("/content-recommend")
def content_recommend(user_data: ContentData):
    prompt = f"""
    Customer Profile:
    - Age: {user_data.Age}
    - Marital Status: {user_data.MaritalStatus}
    - Occupation: {user_data.Occupation}
    - Interests: {user_data.Interests}

    Recommend 3 consumable content items (books, movies, or TV shows). Only list their names.
    """
    return {"recommendations": get_recommendation(prompt)}

def get_recommendation(prompt):
    try:
        response = requests.post(
            MISTRAL_API_URL,
            json={"model": "mistral-small", "messages": [{"role": "user", "content": prompt}]},
            headers=HEADERS
        )
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
