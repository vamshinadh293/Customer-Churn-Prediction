import joblib
import pandas as pd
from pathlib import Path

from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


#Load Model
BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "churn_xgb_model.joblib"
THRESHOLD_PATH = BASE_DIR / "models" / "threshold.txt"

model = joblib.load(MODEL_PATH)

threshold = float(
    THRESHOLD_PATH.read_text()
)




# Create FastAPI application
app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn using XGBoost",
    version="1.0"
)

app.mount(
        "/static",
        StaticFiles(directory="frontend"),
        name="static"
    )

@app.get("/")
def home():
    return FileResponse(
        "frontend/index.html"
    )

# Input schema
class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

def create_tenure_group(tenure):
    if tenure <= 12:
        return "0-12 months"
    elif tenure <= 24:
        return "13-24 months"
    elif tenure <= 48:
        return "25-48 months"
    else:
        return "49-72 months"
    




@app.post("/predict")
def predict_churn(customer: CustomerData):

    data = customer.model_dump()

    # Create the feature used during model training
    data["tenure_group"] = create_tenure_group(data["tenure"])

    df = pd.DataFrame([data])

    probability = model.predict_proba(df)[0, 1]

    prediction = int(probability >= threshold)

    return {
    "churn_prediction": prediction,
    "churn_probability": round(float(probability), 4),
    "decision_threshold": threshold
    }