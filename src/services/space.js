import { request, METHOD } from "@/utils/request";

/**
 * 空间查库列表
 * @http://yapi.talbrain.com/mock/637/dataQualityCenter/metadata/dbList
 */
export async function getdbList(param) {
    return request("/dataQualityCenter/metadata/dbList", METHOD.GET, param);
}

/**
 * 当前用户有哪些空间
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/alarm/getUserSpace
 */
export async function getUserSpace() {
    return request("/dataQualityCenter/alarm/getUserSpace", METHOD.GET);
}

/**
 * 空间下用户列表查询
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/alarm/user/list
 */
export async function getUserList(param) {
    return request("/dataQualityCenter/alarm/user/list", METHOD.GET, param);
}

/**
 * 表列表查询
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/metadata/tableList
 */
export async function getTableList(param) {
    return request("/dataQualityCenter/metadata/tableList", METHOD.POST, param);
}

/**
 * 表标识查字段列表
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/metadata/colList
 */
 export async function getColList(param) {
    return request("/dataQualityCenter/metadata/colList", METHOD.POST, param);
}