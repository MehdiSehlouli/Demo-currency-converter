## High Priority
- Check for unused imports and variables across all files and remove them
- Extract the Header component into its own file `Header.jsx` and add a logo
- Add input validation utilities in `validationUtils.js`
- Trigger a history entry in HistoryTable when the rate is locked/unlocked

## Low Priority
- Separate some utility functions into their own files:
    - Extract currency conversion logic into `currencyUtils.js`
    - Extract history management functions into `historyUtils.js`
    - Extract rate calculation logic into `rateUtils.js`
    - Create Constants file `constants.js` to make it easy to change things like default conversion rates, supported currencies, polling intervals, etc.
