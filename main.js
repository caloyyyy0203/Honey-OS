const { app, BrowserWindow } = require('electron');

function createSplashWindow() {
    const splashWindow = new BrowserWindow({
      width: 600,
      height: 400,
      frame: false, // Removes window frame
      transparent: false, // Makes window transparent
      alwaysOnTop: true, // Keeps window on top of others
      webPreferences: {
        nodeIntegration: true
      }
    });
    splashWindow.loadFile('splash.html');
    
    splashWindow.once('ready-to-show', () => {
      splashWindow.show(); // Show the window when it's ready
    });
  
    return splashWindow;
  }
  

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Don't show window until it's ready
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('desktop.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show(); // Show the window when it's ready
  });
  return mainWindow;
}

app.whenReady().then(() => {
  const splashWindow = createSplashWindow();

  splashWindow.once('ready-to-show', () => {
    // Add a delay of 2 seconds before creating the main window
    setTimeout(() => {
      const mainWindow = createMainWindow();
      mainWindow.once('ready-to-show', () => {
        splashWindow.destroy(); // Close the splash screen when the main window is ready
      });
    }, 10000); // Adjust the delay as needed
  });
});

