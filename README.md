# 🧪 Cypress Test Automation Framework – AutomationExercise.com
This project is a fully custom Cypress test automation framework built from scratch in JavaScript, designed to validate critical user flows on Automation Exercise.

It also includes a working CI/CD pipeline integration, enabling seamless automated test runs on every code push.


# 🔧 Tech Stack
Framework: Cypress

Language: JavaScript (ES6+)

CI/CD: GitHub Actions (or specify if using CircleCI, Travis, etc.)

Design Pattern: Modular structure with reusable custom commands

# ✅ Features
🔹 Automated coverage for:

User registration & login

Product browsing & category filtering

Add to cart & checkout

Contact form and order placement

🔹 Dynamic test data with timestamp-based email generation

🔹 Random selectors to simulate real user variability

🔹 Robust assertions & visual checks

🔹 Custom Cypress commands for better reusability

🔹 CI/CD Pipeline Integration to run tests on every commit or pull request

# ⚙️ CI/CD Integration
Easily maintainable and scalable test automation

Automatically runs test suite via CI pipeline (e.g., GitHub Actions)

Helps ensure high test reliability across code changes

# cypressTest/
│
├── cypress/
│   ├── e2e/             # Test specs
│   ├── support/         # Custom commands/utilities
│   ├── fixtures/        # Test data
│
├── .github/workflows/   # GitHub Actions CI config
├── cypress.config.js    # Cypress config
└── README.md
# git clone https://github.com/MielynA/cypressTest
cd cypressTest
npm install
npx cypress open     # for interactive mode
npx cypress run      # for headless CI mode

# 👩‍💻 Author
Created and maintained by @MielynA to showcase scalable test automation design, with full CI/CD integration using Cypress.
