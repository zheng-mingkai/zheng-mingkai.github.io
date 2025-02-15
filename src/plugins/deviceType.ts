// 设备类型
enum DeviceType {
    // 手机
    Mobile = 1,
    // PC
    PC = 3,
    // 未知
    Unknown = 4
}

const getDeviceType = (): DeviceType => {
    // 获取浏览器的 userAgent 字符串
    const ua = navigator.userAgent;

    // 如果 userAgent 不存在，返回未知类型
    if (!ua) {
        return DeviceType.Unknown;
    }

    // 定义用于匹配手机设备的正则表达式
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod/i;
    // 定义用于匹配 PC 设备的正则表达式
    const pcRegex = /Macintosh|Windows/i;

    // 检查是否为手机设备
    if (mobileRegex.test(ua)) {
        return DeviceType.Mobile;
    }

    // 检查是否为 PC 设备
    if (pcRegex.test(ua)) {
        return DeviceType.PC;
    }

    // 如果都不匹配，返回未知类型
    return DeviceType.Unknown;
};
const isMobile = (): Boolean => {
    return getDeviceType() === DeviceType.Mobile;
}
export default { getDeviceType, isMobile };