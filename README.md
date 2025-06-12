# FlashScan App

## 📋 To-do List (Development)

### ✅ Completed
- [x] Project initialized with Expo (React Native)
- [x] Directory structure reviewed and ready for customization
- [x] Koulen font added to assets/fonts
- [x] Koulen font configured globally in the app
- [x] Flash icons (on/off) added to assets/icons
- [x] Folder structure set up: `src/components`, `src/screens`, `src/utils`, `src/styles`
- [x] Navigation (Home, Gallery, Edit) implemented with TabBar
- [x] Installed expo-camera for camera functionality
- [x] Using CameraView component for camera functionality
- [x] Implement triple-flash effect
- [x] Request and handle camera permissions
- [x] Handle camera errors and permission denials
- [x] Implement camera preview and button layout on Home screen
- [x] Main camera interface with 3 functional buttons (Gallery, Capture, Flash)
- [x] Triple-flash simulation and capture logic
- [x] Save captured photos to local storage using AsyncStorage
- [x] Gallery screen with grid layout for scanned images
- [x] Navigation between Home and Gallery screens

### ❌ To Do
- [ ] Edit screen with crop and save functionality
- [ ] Image cropping logic (using a library)
- [ ] Visual/animation feedback for flashes
- [ ] Responsiveness testing
- [ ] Performance optimization
- [ ] Add splash screen and app icon
- [ ] Add loading states and error handling for image operations
- [ ] Implement image deletion in gallery
- [ ] Add image preview in gallery
- [ ] Add proper TypeScript types for navigation

---

## 📱 FlashScan App
A simple, modern document scanning app with a triple-flash effect, gallery, and basic image editing (crop & save). Designed for both Android and iOS, with a visually appealing and intuitive interface.

### Project Structure (planned)

```
FlashScanApp/
│
├── assets/
│   ├── fonts/         # Custom fonts (Koulen)
│   ├── icons/         # Flash icons (to add)
│   └── images/        # App images
│
├── src/
│   ├── components/    # Buttons, headers, etc.
│   ├── screens/       # Home, Gallery, Edit
│   ├── utils/         # Helper functions (flash, storage, etc.)
│   ├── styles/        # Global styles/themes
│   └── App.js         # Entry point
│
├── README.md
├── package.json
└── ...
```

### Design
- Font: Koulen (Google Fonts)
- Highlight color: #C3E722
- Modern, high-contrast, responsive UI
- Design is on AppMockup folder

---

_This file will be updated as development progresses._

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
