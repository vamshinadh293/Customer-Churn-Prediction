# Customer Churn Prediction

An end-to-end machine learning application for predicting customer churn using XGBoost, SHAP explainability, business-driven threshold optimization, FastAPI, and Docker.

## Project Overview

Customer churn prediction helps businesses identify customers who are likely to discontinue their service so that retention strategies can be targeted toward high-risk customers.

This project develops a complete ML pipeline from exploratory data analysis and model selection to explainability and production-style API deployment.

## Key Features

- Exploratory Data Analysis (EDA)
- Data preprocessing with `ColumnTransformer`
- One-hot encoding for categorical variables
- Feature scaling for numerical variables
- Logistic Regression baseline
- Random Forest comparison
- XGBoost model
- Hyperparameter tuning using `GridSearchCV`
- Stratified cross-validation
- Probability threshold optimization
- Business-cost-based threshold selection
- SHAP model explainability
- FastAPI prediction API
- Web frontend
- Docker containerization

## Machine Learning Pipeline

```text
Raw Customer Data
       ↓
Data Cleaning
       ↓
Exploratory Data Analysis
       ↓
Feature Engineering
       ↓
Train / Test Split
       ↓
Preprocessing Pipeline
       ↓
Logistic Regression
       ↓
Random Forest
       ↓
XGBoost
       ↓
Hyperparameter Tuning
       ↓
Threshold Optimization
       ↓
SHAP Explainability
       ↓
Model Serialization
       ↓
FastAPI
       ↓
Docker
```

## Models

Three classification approaches were evaluated:

- **Logistic Regression** — used as an interpretable baseline model.
- **Random Forest** — used to capture nonlinear relationships and interactions between customer attributes.
- **XGBoost** — selected as the final model after comparing model performance and tuning hyperparameters.

## Final Model Performance

The tuned XGBoost model achieved the following test-set results at the default 0.50 classification threshold:

| Metric    | Score  |
|-----------|--------|
| Accuracy  | 80.70% |
| Precision | 66.89% |
| Recall    | 54.01% |
| F1 Score  | 59.76% |
| ROC-AUC   | 84.73% |

The model was further evaluated using alternative probability thresholds because the default 0.50 threshold is not necessarily optimal for a churn-retention use case.

## Threshold Optimization

At a threshold of 0.27:

| Metric    | Score  |
|-----------|--------|
| Accuracy  | 75.87% |
| Precision | 52.98% |
| Recall    | 80.75% |
| F1 Score  | 63.98% |
| ROC-AUC   | 84.73% |

**Confusion matrix:**

```text
[[767, 268],
 [ 72, 302]]
```

This threshold substantially increases churn recall, allowing the system to identify more potentially churning customers.

The final threshold should ultimately be selected using actual business costs associated with false positives and false negatives.

## Explainability

SHAP was used to understand how individual features influence model predictions.

Important churn-related features included:

- Contract type
- Tenure
- Monthly charges
- Internet service
- Online security
- Technical support
- Payment method
- Paperless billing

The SHAP analysis also provides instance-level explanations showing why a particular customer received a high or low churn-risk prediction.

## API

The model is served using FastAPI.

**Endpoint:** `POST /predict`

The API accepts customer information and returns:

```json
{
  "churn_prediction": 1,
  "churn_probability": 0.7235,
  "decision_threshold": 0.27
}
```

**Prediction interpretation:**

- `churn_prediction = 1` → Customer predicted to churn
- `churn_prediction = 0` → Customer predicted not to churn

The API derives `tenure_group` from the customer's tenure before passing the data to the trained preprocessing pipeline.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/customer-churn-prediction.git
cd customer-churn-prediction
```

Create and activate a virtual environment (Windows):

```bash
python -m venv venv
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn app.main:app --reload
```

Open:

- App: http://localhost:8000
- FastAPI docs: http://localhost:8000/docs

## Running with Docker

Build the Docker image:

```bash
docker build -t customer-churn-api .
```

Run the container:

```bash
docker run -d -p 8000:8000 --name customer-churn-container customer-churn-api
```

Open:

- http://localhost:8000

View container logs:

```bash
docker logs customer-churn-container
```

Stop the container:

```bash
docker stop customer-churn-container
```

## Project Structure

```text
Customer_Churn/
│
├── app/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── models/
│   ├── churn_xgb_model.joblib
│   └── threshold.txt
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── Dockerfile
├── .dockerignore
├── .gitignore
├── requirements.txt
└── README.md
```

## Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- SHAP
- Matplotlib
- Seaborn
- FastAPI
- Uvicorn
- Joblib
- Docker
- Git / GitHub

## Future Improvements

- Model monitoring and data-drift detection
- MLflow experiment tracking
- Automated CI/CD
- Cloud deployment
- Authentication and API security
- Batch prediction pipeline
- Customer retention recommendation system

## Author

**Vamshinadh Jakkampudi**
M.Tech — Blockchain
MANIT Bhopal
