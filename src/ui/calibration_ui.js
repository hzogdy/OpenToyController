// 校准引导UI
"use strict";

const { Calibrator } = require('./core/Calibrator'); // 导入校准器

async function startCalibration() {
    let calibrator = new Calibrator();
    let steps = []; // 存储校准步骤结果
    
    // 步骤1：连接设备
    let connectResult = await dialogs.confirm("第一步：设备连接", "请确保设备已开机并连接蓝牙，然后点击确定");
    if (!connectResult) {
        toast("校准已取消");
        return;
    }
    
    // 步骤2：点击开始按钮
    let startStep = await captureStep("开始/停止", "请点击App中的【开始】按钮");
    if (startStep) steps.push(startStep);
    
    // 步骤3：点击波形选择（可选）
    let hasPattern = await dialogs.confirm("波形模式", "App是否有波形/模式选择功能？");
    if (hasPattern) {
        let patternStep = await captureStep("波形模式", "请点击【波形/模式】选择按钮");
        if (patternStep) steps.push(patternStep);
    }
    
    // 步骤4：变速控制（可选）  
    let hasSpeed = await dialogs.confirm("变速控制", "App是否有变速控制功能？");
    if (hasSpeed) {
        let speedStep = await captureStep("变速控制", "请点击【变速】控制按钮");
        if (speedStep) steps.push(speedStep);
    }
    
    // 步骤5：滑动控制
    let slideStep = await captureStep("滑动控制", "请长按并拖动【强度/速度】滑块");
    if (slideStep) steps.push(slideStep);
    
    // 保存校准结果
    let success = calibrator.saveCalibration(steps);
    if (success) {
        dialogs.alert("校准完成", "所有步骤已完成！校准数据已保存。");
    }
}

// 通用的步骤捕获函数
async function captureStep(stepName, instruction) {
    dialogs.alert(stepName, instruction + "\n\n点击确定后，请在3秒内完成操作");
    
    // 这里可以加入图像识别或控件捕获逻辑
    // 暂时先用简单的坐标记录
    let coords = await captureCoordinates();
    
    return {
        name: stepName,
        type: "click", // 或者 "slide"
        coordinates: coords,
        timestamp: new Date().getTime()
    };
}

// 捕获坐标（这里需要实现具体的捕获逻辑）
async function captureCoordinates() {
    // 方法1：基于控件的捕获（推荐）
    let widget = captureWidget();
    if (widget) {
        return {
            type: "widget",
            id: widget.id(),
            bounds: widget.bounds()
        };
    }
    
    // 方法2：基于图像识别的捕获（备选）
    // 让用户点击屏幕，记录点击位置
    return new Promise((resolve) => {
        toast("请在3秒内点击目标位置");
        let startTime = new Date().getTime();
        
        // 这里需要监听屏幕点击事件（Auto.js的高级功能）
        // 简化版：直接返回测试坐标
        setTimeout(() => {
            resolve({
                type: "coordinate", 
                x: 500, 
                y: 800
            });
        }, 1000);
    });
}

// 捕获控件信息
function captureWidget() {
    // 使用Auto.js的控件选择功能
    let selected = className('android.widget.Button').findOne(1000);
    if (selected) {
        return selected;
    }
    return null;
}

module.exports = { startCalibration };