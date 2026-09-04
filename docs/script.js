document
    .getElementById("churnForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        // Collect form data
        const data = {
            gender: document.getElementById("gender").value,
            SeniorCitizen: parseInt(
                document.getElementById("SeniorCitizen").value
            ),
            Partner: document.getElementById("Partner").value,
            Dependents: document.getElementById("Dependents").value,
            tenure: parseInt(
                document.getElementById("tenure").value
            ),
            PhoneService: document.getElementById("PhoneService").value,
            MultipleLines: document.getElementById("MultipleLines").value,
            InternetService: document.getElementById("InternetService").value,
            OnlineSecurity: document.getElementById("OnlineSecurity").value,
            OnlineBackup: document.getElementById("OnlineBackup").value,
            DeviceProtection: document.getElementById("DeviceProtection").value,
            TechSupport: document.getElementById("TechSupport").value,
            StreamingTV: document.getElementById("StreamingTV").value,
            StreamingMovies: document.getElementById("StreamingMovies").value,
            Contract: document.getElementById("Contract").value,
            PaperlessBilling: document.getElementById("PaperlessBilling").value,
            PaymentMethod: document.getElementById("PaymentMethod").value,
            MonthlyCharges: parseFloat(
                document.getElementById("MonthlyCharges").value
            ),
            TotalCharges: parseFloat(
                document.getElementById("TotalCharges").value
            )
        };

        try {

            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Prediction request failed");
            }

            const result = await response.json();

            console.log("Server response:", result);

            // Show result section
            document
                .getElementById("result")
                .classList.remove("hidden");

            // Values returned by FastAPI
            const probability = result.churn_probability;
            const threshold = result.decision_threshold;
            const prediction = result.churn_prediction;

            // Churn probability
            document.getElementById("probability").textContent =
                `${(probability * 100).toFixed(2)}%`;

            // Decision threshold
            document.getElementById("threshold").textContent =
                `${(threshold * 100).toFixed(0)}%`;

            // Prediction
            document.getElementById("prediction").textContent =
                prediction === 1 ? "CHURN" : "NO CHURN";

        } catch (error) {

            console.error("Prediction error:", error);

            alert("Unable to get prediction from the server.");
        }
    });