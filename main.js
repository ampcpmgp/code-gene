const { app, BrowserWindow } = require("electron");

let win;
function createWindow() {
    win = new BrowserWindow({ width: 800, height: 660 });
    win.loadURL(`file://${__dirname}/index.html`);
    win.on("closed", () => { win = null; });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

var App = {
    showErrorBox: function(){
		dialog.showErrorBox('Error Box Example', 'Error Box');
	}
};