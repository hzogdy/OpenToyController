// 📁 src/core/ConfigManager.js
class ConfigManager {
    static loadConfig(appName) {
        let configPath = `/sdcard/OpenPilot/profiles/${appName}.json`;
        if (files.exists(configPath)) {
            return JSON.parse(files.read(configPath));
        }
        return null; // 没有配置文件，需要校准
    }

    static saveConfig(appName, configData) {
        let dirPath = `/sdcard/OpenPilot/profiles/`;
        files.ensureDir(dirPath);
        files.write(files.join(dirPath, `${appName}.json`), JSON.stringify(configData, null, 2));
    }
}