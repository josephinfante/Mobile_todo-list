import { DeviceEventEmitter } from "react-native"

export const toast = {
    warning: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: "warning"});
    },

    success: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: "success"});
    },

    error: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: "error"});
    }
}

export const SHOW_TOAST_MESSAGE = "SHOW_TOAST_MESSAGE"