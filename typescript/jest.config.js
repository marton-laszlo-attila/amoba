module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ]
};