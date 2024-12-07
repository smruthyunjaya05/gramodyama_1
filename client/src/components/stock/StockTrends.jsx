import React, { useState } from "react";

// Main Stock Analysis Component
const StockAnalyzer = () => {
  const [symbol, setSymbol] = useState("");
  const [language, setLanguage] = useState("English");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // API Key and Base URL
  const API_KEY = "YW2SS10E8ZZTW7WU"; // Replace with your Alpha Vantage API key
  const BASE_URL = "https://www.alphavantage.co/query";

  // Function to fetch daily stock data
  const fetchDailyStockData = async (symbol) => {
    const params = new URLSearchParams({
      function: "TIME_SERIES_DAILY",
      symbol: symbol,
      apikey: API_KEY,
    });

    try {
      const response = await fetch(`${BASE_URL}?${params.toString()}`); // Corrected line
      const data = await response.json();
      console.log("API Response:", data); // Log the full response

      if ("Time Series (Daily)" in data) {
        return data["Time Series (Daily)"];
      } else if ("Note" in data) {
        throw new Error("API limit reached. Please wait and try again.");
      } else if ("Error Message" in data) {
        throw new Error(`Invalid symbol "${symbol}". Please check and try again.`);
      } else {
        throw new Error("No valid data found. Check the symbol or API limits.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Function to generate detailed summary
  const generateDetailedSummary = (data, symbol, language) => {
    const dates = Object.keys(data);
    const latestDate = dates[0];
    const latestData = data[latestDate];

    // Extract relevant data
    const openPrice = parseFloat(latestData["1. open"]);
    const closePrice = parseFloat(latestData["4. close"]);
    const highPrice = parseFloat(latestData["2. high"]);
    const lowPrice = parseFloat(latestData["3. low"]);
    const volume = parseInt(latestData["5. volume"]);
    const averagePrice = (highPrice + lowPrice) / 2;
    const percentageRange = ((highPrice - lowPrice) / lowPrice) * 100;

    // Build summary based on language
    const summary =
      language === "Kannada"
        ? ` 
        ${symbol} ಸ್ಟಾಕ್ ಸಂಪೂರ್ಣ ವಿವರ (${latestDate})
        ---------------------------------------------
        ಆರಂಭಿಕ ಬೆಲೆ: ₹${openPrice.toFixed(2)}
        ಮುಕ್ತಾಯ ಬೆಲೆ: ₹${closePrice.toFixed(2)}
        ಉಚ್ಛ್ರೇಷ್ಠ ಬೆಲೆ: ₹${highPrice.toFixed(2)}
        ಕಡಿಮೆ ಬೆಲೆ: ₹${lowPrice.toFixed(2)}
        ಸರಾಸರಿ ವ್ಯಾಪಾರದ ಬೆಲೆ: ₹${averagePrice.toFixed(2)}
        ಉಚ್ಛ್ರೇಷ್ಠದಿಂದ ಕಡಿಮೆ ಶ್ರೇಣಿ: ${percentageRange.toFixed(2)}%
        ವಾಲ್ಯೂಮ್: ${volume.toLocaleString()}
        `
        : `
        Detailed Stock Summary for ${symbol} (${latestDate})
        ---------------------------------------------
        Open Price: ₹${openPrice.toFixed(2)}
        Close Price: ₹${closePrice.toFixed(2)}
        Highest Price: ₹${highPrice.toFixed(2)}
        Lowest Price: ₹${lowPrice.toFixed(2)}
        Average Trading Price: ₹${averagePrice.toFixed(2)}
        Percentage Range (High to Low): ${percentageRange.toFixed(2)}%
        Volume: ${volume.toLocaleString()}
        `;

    return { summary, stockData: { openPrice, closePrice, volume } };
  };

  // Function to generate trend insights
  const generateTrendInsights = (stockData, language) => {
    const { openPrice, closePrice, volume } = stockData;
    const priceChange = closePrice - openPrice;
    const percentageChange = (priceChange / openPrice) * 100;

    // Determine insights based on language
    const { trend, advice } =
      percentageChange > 2
        ? language === "Kannada"
          ? {
              trend: "ಬಲಶಾಲಿ ಪ್ರವರ್ತನೆ 📈 - ಸ್ಟಾಕ್ ವೇಗವಾಗಿ ಏರಿಕೆ.",
              advice: "ಈ ಸ್ಟಾಕ್ ಗುರುತಿಸಲಾಗುತ್ತದೆ, ಹೂಡಿಕೆ ಮಾಡಬಹುದು.",
            }
          : {
              trend: "Bullish 📈 - Strong growth observed.",
              advice:
                "This stock shows potential for investment based on today's performance.",
            }
        : percentageChange < -2
        ? language === "Kannada"
          ? {
              trend: "ಗತಿಮತಿನ ಇಳಿಕೆಗೆ ಸೂಚನೆ 📉 - ಸ್ಟಾಕ್ ಖರಾಪಟ್ಟೆಗೊಂಡಿದೆ.",
              advice: "ಹೆಚ್ಚುವಿಕೆಯನ್ನು ನಿರೀಕ್ಷಿಸುತ್ತೇವೆ.",
            }
          : {
              trend: "Bearish 📉 - Declining trend detected.",
              advice:
                "This stock had a poor performance today. Consider monitoring it further.",
            }
        : language === "Kannada"
        ? {
            trend: "ಸ್ಥಿರ ಪ್ರವರ್ತನೆ ➖ - ಬದಲಾವಣೆ ಕಡಿಮೆ.",
            advice: "ನಿರೀಕ್ಷಣೆ ಕಡಿಮೆ, ಕಾಪಾಡಿ.",
          }
        : {
            trend: "Stable ➖ - Minor changes observed.",
            advice: "No significant movements today. Hold off on major decisions.",
          };

    return `
      Trend-Based Insights
      ---------------------
      Price Change: ₹${priceChange.toFixed(2)} (${percentageChange.toFixed(2)}%)
      Trend: ${trend}
      Recommendation: ${advice}
    `;
  };

  // Handle the form submission
  const analyzeStock = async () => {
    setError("");
    setOutput("");

    if (!symbol) {
      setError("Please enter a stock symbol.");
      return;
    }

    try {
      const data = await fetchDailyStockData(symbol);
      const { summary, stockData } = generateDetailedSummary(data, symbol, language);
      const insights = generateTrendInsights(stockData, language);

      setOutput(`${summary}\n\n${insights}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>📈 Stock Analysis</h1>
      <label>
        Enter Stock Symbol:
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
      </label>
      <br />
      <label>
        Choose Language:
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Kannada">Kannada</option>
        </select>
      </label>
      <br />
      <button onClick={analyzeStock}>Analyze</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && <pre>{output}</pre>}
    </div>
  );
};

export default StockAnalyzer;
