/*
 * @Author: zhangbin19
 * @Date: 2020-11-30 15:15:44
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-26 15:44:09
 */
import { request, METHOD } from "@/utils/request";

/**
 * 关联关系查询
 * api地址：http://yapi.talbrain.com/project/637/interface/api/41677
 */
export async function pagedQuery(param) {
  return request(`/dataQualityCenter/relationship/pagedQuery`, METHOD.GET, param);
}

/**
 * 新建关联关系
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/relationship/createRelation
 */
export async function createRelation(param) {
  return request(`/dataQualityCenter/relationship/createRelation`, METHOD.POST, param);
}

/**
 * 关联关系详情
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/relationship/details
 */
export async function relationDetails(param) {
  return request(`/dataQualityCenter/relationship/details`, METHOD.GET, param);
}

/**
 * 关联关系删除
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/relationship/deleteRelation
 */
export async function delRelation(param) {
  return request(`/dataQualityCenter/relationship/deleteRelation`, METHOD.DELETE, param);
}

/**
 * taskId列表查询
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/relationship/getTaskList
 */
 export async function getTaskList(param) {
  return request(`/dataQualityCenter/relationship/getTaskList`, METHOD.GET, param);
}


/**
 * dagId查询
 * http://yapi.talbrain.com/mock/637/dataQualityCenter/relationship/getTaskList
 */
 export async function getDagList(param) {
  return request(`/dataQualityCenter/relationship/getDagList`, METHOD.GET, param);
}


export default {
}

///dataQualityCenter/relationship/getTaskList
