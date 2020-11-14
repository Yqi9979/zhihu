/**
 * 到时间戳
 *
 * @export
 * @param {Date} [time=Date.now()] 时间
 * @param {boolean} [isTens=false] 是否十位
 * @returns
 */
export function getUnix(time = Date.now(), isTens = false) {
    if (typeof time === String) time = new Date(time);
    if (typeof time === Date) time = time.getTime();
    return isTens ? parseInt(time / 1000) : time;
}

/**
 * 格式化时间
 *
 * @export
 * @param {String} fmt 格式
 * @param {Date} [date=new Date()] 时间
 * @returns
 */
export function dateFormat(fmt, date = new Date()) {
    if (typeof date !== Date) date = new Date(date);

    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString().padStart(2, "0"), // 月
        "d+": date.getDate().toString().padStart(2, "0"), // 日
        "H+": date.getHours().toString().padStart(2, "0"), // 时
        "M+": date.getMinutes().toString().padStart(2, "0"), // 分
        "S+": date.getSeconds().toString().padStart(2, "0") // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
        }
    }
    return fmt;
}

/**
 * 基于现行时间，取第几天
 *
 * @export
 * @param {Number} n 第 n 天
 * @returns {Date} 基于今天的第 n 天
 */
export function toDay(n) {
    return new Date(Date.now() + 24 * 60 * 60 * 1000 * n);
}

/**
 * 是否为今天
 *
 * @export
 * @param {Date/Number} time 时间/十三位时间戳
 * @returns
 */
export function isToday(time) {
    time = new Date(time).getTime();
    return parseInt(time / 1000 / 60 / 60 / 24) === parseInt(Date.now() / 1000 / 60 / 60 / 24);
}
