const { startCalibration } = require('./calibration_ui');
const { CommandMapper } = require('./core/CommandMapper');
const { Calibrator } = require('./core/calibrator').default;

// 启动校准
function startApp() {
    let choice = dialogs.select("请选择操作", ["校准新设备", "使用已有配置"]);
    
    if (choice === 0) {
        // 开始校准流程
        startCalibration();
    } else {
        // 使用已有配置启动CommandMapper
        let calibrator = new Calibrator();
        let config = calibrator.getCommandConfig();
        
        if (config) {
            let mapper = new CommandMapper(config);
            mapper.initialize();
            toast("系统已就绪");
        } else {
            dialogs.alert("错误", "未找到校准配置，请先进行校准");
            startCalibration();
        }
    }
}

// 启动应用
startApp();