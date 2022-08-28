import { isEmpty, set } from 'lodash'

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
    return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache두
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
    return !isEmpty(obj) && typeof obj === 'object'
}

export function isPromise (val) {
    return val && typeof val.then === 'function'
}

export function assert (condition, msg) {
    if (!condition) {
        throw new Error(`[vuex] ${msg}`)
    }
}

export function partial (fn, arg) {
    return function () {
        return fn(arg)
    }
}

export function objectFilter (obj, predicate) {
    const result = {}
    let key

    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key])) {
            result[key] = obj[key]
        }
    }

    return result
}

/**
 * find menu name for route path
 * @param menu
 * @param routePath ex) /manager/list
 * @returns {string}
 */
export function findMenuName (menu, routePath) {
    const paths = routePath.split('/')
    const menuObj = searchMenu(null, menu, paths)
    return menuObj != null ? menuObj.title : ''
}

function searchMenu (parent, child, paths) {
    if (parent !== null && parent.group === ('/' + paths[1]) && child.to && child.to === paths[2]) {
        return child
    } else if (child.children) {
        for (let i = 0; i < child.children.length; i++) {
            const result = searchMenu(child, child.children[i], paths)
            if (result != null) {
                return result
            }
        }
    }
    return null
}

export function dayToKr (day) {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[day]
}

export function setCookie (cname, cvalue) {
    document.cookie = cname + '=' + cvalue
}

export function deleteCookie (cname) {
    document.cookie = cname + '= ; max-age=-1'
}

export function getCookie (name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return value ? value[2] : null
}

export function calculatePercentage (actual, total) {
    return (actual / total) * 100
}

export function isEqualsObject (source, target) {
    try {
        for (const key in target) {
            const targetValue = target[key]
            let sourceValue = source[key]
            if (sourceValue === undefined || sourceValue === null) {
                sourceValue = typeof targetValue === 'object' ? null : ''
            }

            if (targetValue instanceof Array) {
                if (!isEqualsArray(sourceValue, targetValue)) {
                    return false
                }
            } else if (typeof targetValue === 'object') {
                if (!isEqualsObject(sourceValue, targetValue)) {
                    return false
                }
            } else if (targetValue !== sourceValue) {
                return false
            }
        }

        return true
    } catch (e) {
        // undefined property 때문에 false로 return
        return false
    }
}

export function isEqualsArray (source = [], target = []) {
    return target.filter((v, i) => !isEqualsObject(source[i], v)).length === 0
}

export function createDefaultDisplayStartDateTime () {
    const now = new Date()

    if (now.getHours() >= 13) {
        now.setDate(now.getDate() + 1)
    }

    return `${now.toISOString().substr(0, 10)} 13:00:00`
}

export function hasClass (el, cls) {
    let i
    const classes = el.className ? el.className.split(' ') : ''
    if (classes) {
        for (i = 0; i < classes.length; i++) {
            if (classes[i] === cls) {
                return true
            }
        }
    }
    return false
}

export function addClass (el, add) {
    el.className = (el.className + ' ' + add).trim()
}

export function removeClass (el, remove) {
    let newClassName = ''
    let i
    const classes = el.className.replace(/\s{2,}/g, ' ').split(' ')
    for (i = 0; i < classes.length; i++) {
        if (classes[i] !== remove) {
            newClassName += classes[i] + ' '
        }
    }
    el.className = newClassName.trim()
}

export const replaceAll = (str, searchStr, replaceStr) => str.split(searchStr).join(replaceStr)

export const textareaEncode = (textareaContent = '') => {
    return replaceAll(
        textareaContent,
        '\n',
        '<br>',
    )
}

export const textareaDecode = (textareaContent = '') => {
    return decodeURIComponent(textareaContent)
}

export const objectToSelectOptionList = (obj) => {
    const options = []
    for (const key in obj) {
        const value = obj[key]
        options.push({ text: value, value: value })
    }

    return options
}

export const calculateByte = (str) => {
    if (!str) {
        return 0
    }

    let byte = 0
    for (let i = 0; i < str.length; i++) {
        byte += 1 * (str.charCodeAt(i) > 127 ? 2 : 1)
    }

    return byte
}

export const cutByMaxByte = (str, maxByte) => {
    if (!str) {
        return 0
    }

    let byte = 0
    for (let i = 0; i < str.length; i++) {
        byte += 1 * (str.charCodeAt(i) > 127 ? 2 : 1)

        if (byte > maxByte) {
            return str.substr(0, i)
        }
    }

    return str
}

export const convertToSearchParams = (search, listInfo) => {
    return {
        ...search,
        page: listInfo.page - 1,
        size: listInfo.size,
        sort: listInfo.sort
    }
}

export const isEmptyCollection = arr => {
    return !arr || arr.length === 0
}

export const convertToObject = query => Object.keys(query).reduce((o, k) => set(o, k, valueOf(query[k])), {})

const BOOLEAN_STRING_MAP = new Map([
    ['true', true],
    ['false', false]
])
const valueOf = v => !BOOLEAN_STRING_MAP.has(v) ? v : BOOLEAN_STRING_MAP.get(v)

export const customParamsSerializer = (params) => {
    const queryString = new URLSearchParams()
    for (const [key, value] of Object.entries(flatObject(params))) {
        if (value !== null && value !== undefined && value !== '') {
            queryString.append(key, value)
        }
    }

    return queryString.toString()
}

export const flatObject = (object, prefix = '') => {
    return Object.keys(object).reduce((carry, key) => {
        const pre = prefix ? prefix + `.${key}` : ''

        if (Array.isArray(object[key])) {
            carry = object[key].reduce((array, value, index) => {
                array[(pre || key) + `[${index}]`] = value
                return array
            }, carry)
        } else if (object[key] && typeof object[key] === 'object') {
            Object.assign(carry, flatObject(object[key], pre || key))
        } else {
            carry[pre || key] = object[key]
        }

        return carry
    }, {})
}

export const clearObjectProperties = (object) => {
    Object.keys(object).forEach(key => {
        if (Array.isArray(object[key])) {
            object[key] = []
        } else if (object[key] && typeof object[key] === 'object') {
            clearObjectProperties(object[key])
        } else if (typeof object[key] === 'boolean') {
            object[key] = false
        } else if (typeof object[key] === 'string' && object[key] === '') {
            object[key] = ''
        } else {
            object[key] = null
        }
    })
}

export const clearOnlyObjectProperties = (object) => {
    Object.keys(object).forEach(key => {
        if (typeof object[key] === 'boolean') object[key] = false
        else object[key] = ''
    })
}

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * @param dm decimal mark to display
 * @return Formatted string.
 */
export const humanFileSize = (bytes, si = false, dp = 1, dm) => {
    if (bytes === null || bytes === 0 || bytes === '') {
        return
    }
    const thresh = si ? 1000 : 1024
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
    }
    const units = si
        ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    do {
        bytes /= thresh
        ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1) {
        const displayByte = typeof dm === 'function' ? dm(bytes) : bytes.toFixed(dp)
        return displayByte + ' ' + units[u]
    }
}

export const lnbMenuType = {
    recruitment: 'recruitment',
    baseSettings: 'baseSettings'
}