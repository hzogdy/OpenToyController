// calibrator.js - 使用传统JS语法
"use strict";

// 用构造函数替代class
function Calibrator() {
    this.data = "测试数据";
    this.calibratedAt = null;
}

// 用原型添加方法
Calibrator.prototype.saveCalibration = function(steps) {
    this.data = JSON.stringify(steps);
    this.calibratedAt = new Date().toString();
    toast("校准数据已保存: " + this.data);
    return true;
};

Calibrator.prototype.loadCalibration = function() {
    return this.data;
};

Calibrator.prototype.test = function() {
    return "Calibrator传统语法工作正常！";
};

// 导出
module.exports = Calibrator;

