import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "../interface/orders.interface";

export const useOrderItemStore = defineStore('order', () => {

    let orderItem = ref<Order>({
        id: "",
        date: "",
        description: "",
        state: false,
        client: "",
        process: ""
    })

    const setOrderItem = (order: Order) => {
        orderItem.value = order;
    } 

    return {
        orderItem,
        setOrderItem
    }
})