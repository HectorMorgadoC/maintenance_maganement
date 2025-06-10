import { managementApi } from "../../../api/managementApi";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { UUIDTypes } from "uuid";

interface OrderForReport {
    id: UUIDTypes,
    team: UUIDTypes,
    client: UUIDTypes
}


export const getOrderById = async (id: UUIDTypes): 
Promise< MessageError | OrderForReport > => {
    
        try {
            let response = await managementApi.get<OrderForReport>(`/order/${id}`);

            let report: OrderForReport = response.data
            return report

        } catch (error) {
            console.log(error)
            return {
                    message: `${isAxiosError(error) && error.response?.data.message}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } 

