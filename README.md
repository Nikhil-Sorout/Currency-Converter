# Currency Converter App

This is a simple React Native app that allows users to convert currencies using live exchange rates fetched from a public API.


## Features

- Input field to enter the amount to be converted.
- Dropdowns to select the source and target currencies.
- Fetches live exchange rates from the [ExchangeRate-API](https://www.exchangerate-api.com/).
- Displays the converted amount after pressing the "Convert" button.
- Dark theme UI for better user experience.


## Prerequisites

- Node.js installed on your system.
- Expo CLI installed globally. You can install it using:
  ```bash
  npm install -g expo-cli
  ```
- A mobile device or emulator to run the app.


## Get Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the app**:
   ```bash
   npx expo start
   ```

3. **Run on a device or emulator**:
   - Scan the QR code displayed in the terminal using the Expo Go app (available on iOS and Android).
   - Alternatively, press `a` to run on an Android emulator or `i` to run on an iOS simulator.



## Challenges Faced

1. **Dropdown Overlap**:
   - Initially, the dropdowns overlapped each other when opened. This was resolved by dynamically adjusting the `zIndex` of the dropdowns.

2. **Result Display**:
   - The result was updating dynamically with dropdown changes, which caused confusion. This was fixed by ensuring the result is displayed only after the "Convert" button is pressed.

3. **API Errors**:
   - Handled cases where the API failed to fetch data by displaying an error message to the user.

4. **UI Consistency**:
   - Ensured the app follows a dark theme for all components, including dropdowns and input fields.



## Future Improvements

- Add support for offline mode by caching the latest exchange rates.
- Include a toggle for light and dark themes.
- Add unit tests for core functionalities.



## Learn More

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

