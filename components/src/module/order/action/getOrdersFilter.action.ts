import { managementApi } from "../../../api/managementApi";
import type { MessageError } from "../../common/interface/message-error.interface";
import { isAxiosError } from "axios";
import type { Order } from "../interface/orders.interface";





export const getOrderFilters = async (team:string,client:string,date:string,is_actived:string): 
Promise< MessageError | Order[] > => {
    
        try {
            
            let response = await managementApi.get<Order[]>('/client',{
                params: {
                    team: team,
                    client: client,
                    date_time: date,
                    order_state: is_actived
                }
            });

            let orders: Order[] = response.data
            return orders

        } catch (error) {
            console.log(error)
            return {
                    message: `${isAxiosError(error) && error.response?.data}`,
                    error: `${isAxiosError(error) && error.response?.statusText}`,
                    statusCode: isAxiosError(error) && error.response?.status || 500
                }
        }
    } 

