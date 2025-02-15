/**
 * 创建二维数组
 * @param {number} row 行数
 * @param {number} column 列数
 * @param {any} value 默认值
 * @returns {any[][]} 返回一个二维数组，数组元素类型与传入的默认值类型相同
 */
const createTwoDimensionalArray = (row: number, column: number, value: any): any[][] => {
    return Array.from({ length: row }, () => Array(column).fill(value));
};

export { createTwoDimensionalArray };