export const schemes = {
    agriculture: [
        {
            id: 1,
            name: "ಕೃಷಿ ಸಂಜೀವಿನಿ ಯೋಜನೆ",
            description: "ಸಣ್ಣ ಮತ್ತು ಮಧ್ಯಮ ರೈತರಿಗೆ ಆರ್ಥಿಕ ನೆರವು",
            category: "Agriculture",
            thumbnail: "/images/schemes/agriculture1.jpg",
            implementationPeriod: "2023-2024",
            objectives: [
                "ರೈತರ ಆದಾಯ ಹೆಚ್ಚಳ",
                "ಆಧುನಿಕ ಕೃಷಿ ಪದ್ಧತಿಗಳ ಅಳವಡಿಕೆ"
            ],
            benefits: [
                "ಕೃಷಿ ಉಪಕರಣಗಳಿಗೆ 50% ಸಹಾಯಧನ",
                "ತರಬೇತಿ ಮತ್ತು ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ"
            ],
            targetBeneficiaries: [
                "18-65 ವರ್ಷ ವಯಸ್ಸಿನ ರೈತರು",
                "2 ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಕಡಿಮೆ ಭೂಮಿ ಹೊಂದಿರುವವರು"
            ],
            financialDetails: {
                maxAssistance: "₹50,000",
                phases: "2 ಕಂತುಗಳಲ್ಲಿ",
                conditions: "ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯ"
            },
            eligibilityCriteria: {
                age: { min: 18, max: 65 },
                income: { max: 250000 },
                landHolding: { max: 2 },
                region: ["ಉತ್ತರ ಕರ್ನಾಟಕ", "ದಕ್ಷಿಣ ಕರ್ನಾಟಕ"],
                caste: ["General", "OBC", "SC", "ST"],
                maritalStatus: ["Married", "Unmarried"]
            },
            applicationProcess: {
                steps: ["ಅರ್ಜಿ ನಮೂನೆ ಭರ್ತಿ", "ಅಗತ್ಯ ದಾಖಲೆಗಳ ಸಲ್ಲಿಕೆ"],
                requiredDocuments: ["ಆಧಾರ್ ಕಾರ್ಡ್", "ಭೂಮಿಯ ದಾಖಲೆಗಳು"],
                processingTime: "30 ದಿನಗಳು",
                supportContact: {
                    phone: "080-22222222",
                    email: "support@krishisanjivini.kar.gov.in"
                }
            }
        },
        {
            id: 2,
            name: "ಹನಿ ನೀರಾವರಿ ಯೋಜನೆ",
            description: "ಹನಿ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಗೆ ಸಹಾಯಧನ",
            category: "Agriculture",
            thumbnail: "/images/schemes/drip-irrigation.jpg",
            implementationPeriod: "2023-2024",
            objectives: [
                "ನೀರಿನ ಸಮರ್ಪಕ ಬಳಕೆ",
                "ಬೆಳೆ ಉತ್ಪಾದಕತೆ ಹೆಚ್ಚಳ"
            ],
            benefits: [
                "90% ಸಹಾಯಧನ",
                "ತಾಂತ್ರಿಕ ಮಾರ್ಗದರ್ಶನ"
            ],
            targetBeneficiaries: ["ಎಲ್ಲಾ ರೈತರು"],
            financialDetails: {
                maxAssistance: "₹75,000",
                phases: "ಒಂದು ಕಂತಿನಲ್ಲಿ",
                conditions: "ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯ"
            },
            eligibilityCriteria: {
                age: { min: 18, max: 70 },
                income: { max: 500000 },
                landHolding: { max: 5 },
                region: ["ಕರ್ನಾಟಕ ರಾಜ್ಯ"],
                caste: ["General", "OBC", "SC", "ST"],
                maritalStatus: ["Married", "Unmarried"]
            },
            applicationProcess: {
                steps: ["ಆನ್‌ಲೈನ್ ಅರ್ಜಿ", "ಭೂಮಿ ಪರಿಶೀಲನೆ"],
                requiredDocuments: ["RTC", "ಆಧಾರ್ ಕಾರ್ಡ್"],
                processingTime: "45 ದಿನಗಳು",
                supportContact: {
                    phone: "080-33333333",
                    email: "drip@agriculture.kar.gov.in"
                }
            }
        }
    ],
    business: [
        {
            id: 3,
            name: "ಸ್ವಯಂ ಉದ್ಯೋಗ ಯೋಜನೆ",
            description: "ಯುವ ಉದ್ಯಮಿಗಳಿಗೆ ಸಾಲ ಮತ್ತು ಸಹಾಯಧನ",
            category: "Business",
            thumbnail: "/images/schemes/self-employment.jpg",
            implementationPeriod: "2023-2024",
            objectives: [
                "ಯುವ ಉದ್ಯಮಿಗಳ ಪ್ರೋತ್ಸಾಹ",
                "ಉದ್ಯೋಗ ಸೃಷ್ಟಿ"
            ],
            benefits: [
                "25% ಸಹಾಯಧನ",
                "4% ಬಡ್ಡಿ ದರದಲ್ಲಿ ಸಾಲ"
            ],
            targetBeneficiaries: [
                "18-45 ವರ್ಷ ವಯಸ್ಸಿನವರು",
                "ಪದವೀಧರರು"
            ],
            financialDetails: {
                maxAssistance: "₹200,000",
                phases: "3 ಕಂತುಗಳಲ್ಲಿ",
                conditions: "ವ್ಯವಹಾರ ಯೋಜನೆ ಅಗತ್ಯ"
            },
            eligibilityCriteria: {
                age: { min: 18, max: 45 },
                income: { max: 300000 },
                landHolding: { max: 0 },
                region: ["ಕರ್ನಾಟಕ ರಾಜ್ಯ"],
                caste: ["General", "OBC", "SC", "ST"],
                maritalStatus: ["Married", "Unmarried"]
            },
            applicationProcess: {
                steps: ["ಆನ್‌ಲೈನ್ ಅರ್ಜಿ", "ಯೋಜನಾ ವರದಿ ಸಲ್ಲಿಕೆ"],
                requiredDocuments: ["ಶೈಕ್ಷಣಿಕ ದಾಖಲೆಗಳು", "ಆಧಾರ್"],
                processingTime: "60 ದಿನಗಳು",
                supportContact: {
                    phone: "080-44444444",
                    email: "business@karnataka.gov.in"
                }
            }
        }
    ],
    education: [
        {
            id: 4,
            name: "ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಯೋಜನೆ",
            description: "ಮೆರಿಟ್ ಆಧಾರಿತ ವಿದ್ಯಾರ್ಥಿ ವೇತನ",
            category: "Education",
            thumbnail: "/images/schemes/scholarship.jpg",
            implementationPeriod: "2023-2024",
            objectives: [
                "ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರೋತ್ಸಾಹ",
                "ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವು"
            ],
            benefits: [
                "ಮಾಸಿಕ ವಿದ್ಯಾರ್ಥಿ ವೇತನ",
                "ಪುಸ್ತಕ ಭತ್ಯೆ"
            ],
            targetBeneficiaries: [
                "ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳು",
                "80% ಅಂಕ ಪಡೆದವರು"
            ],
            financialDetails: {
                maxAssistance: "₹5,000 ಪ್ರತಿ ತಿಂಗಳು",
                phases: "ಮಾಸಿಕ",
                conditions: "ಹಾಜರಾತಿ 75% ಕಡ್ಡಾಯ"
            },
            eligibilityCriteria: {
                age: { min: 17, max: 25 },
                income: { max: 250000 },
                landHolding: { max: 0 },
                region: ["ಕರ್ನಾಟಕ ರಾಜ್ಯ"],
                caste: ["General", "OBC", "SC", "ST"],
                maritalStatus: ["Unmarried"]
            },
            applicationProcess: {
                steps: ["ಆನ್‌ಲೈನ್ ಅರ್ಜಿ", "ದಾಖಲೆ ಪರಿಶೀಲನೆ"],
                requiredDocuments: ["ಅಂಕಪಟ್ಟಿ", "ಆಧಾರ್ ಕಾರ್ಡ್"],
                processingTime: "30 ದಿನಗಳು",
                supportContact: {
                    phone: "080-55555555",
                    email: "scholarship@education.kar.gov.in"
                }
            }
        }
    ]
};