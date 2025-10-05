// 📁 src/ai/state_controller.js

class StateController {
  constructor() {
    this.currentState = 'neutral'; // 状态机：neutral, excited, plateau, climax, calming
    this.userArousal = 0.5; // 用户兴奋度 [0, 1]
  }

  // 根据传感器输入更新状态
  updateState(voiceData) {
    this.userArousal = voiceData.arousal;

    // 简单的状态机逻辑
    if (this.userArousal > 0.8) {
      this.currentState = 'excited';
    } else if (this.userArousal < 0.3) {
      this.currentState = 'calming';
    } else {
      this.currentState = 'neutral';
    }
  }

  // 生成自主调整指令（即使没有文字命令也会执行）
  generateAutonomousCommand() {
    switch (this.currentState) {
      case 'excited':
        // 兴奋时，自动逐渐增强强度，或加快波形频率
        return {action: 'ramp_intensity', target: 90, duration: 5000}; // 5秒内增强到90
      case 'plateau':
        // 平台期，变换波形保持新鲜感
        return {action: 'randomize_pattern'};
      case 'calming':
        // 平静时，逐渐减弱
        return {action: 'ramp_intensity', target: 20, duration: 10000};
      default:
        return null; // 无自主操作
    }
  }
}