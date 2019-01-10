import axios from "axios";
import decode from "jwt-decode";

const mockDevices = {
    data: {
        devices: [
            {
                iotdeviceID: "IoTbx00000000001",
                hostname: "https://boxchain-devices.net:3001",
                privateKey: "TDU2WHFROXKHDNN7KCTDU2WHFROXKHDNN7KC",
                contractID: "CNTRCT0412",
            },
            {
                iotdeviceID: "IoTbx00000000002",
                hostname: "https://boxchain-devices.net:3002",
                privateKey: "TDU2WHFROXKHDNN7KCTDU2WHFROXKHDNN7KC",
                contractID: "CNTRCT0412",
            },
            {
                iotdeviceID: "IoTbx00000000003",
                hostname: "https://boxchain-devices.net:3003",
                privateKey: "TDU2WHFROXKHDNN7KCTDU2WHFROXKHDNN7KC",
                contractID: "Not Assigned",
            },
            {
                iotdeviceID: "IoTbx00000000004",
                hostname: "https://boxchain-devices.net:3004",
                privateKey: "TDU2WHFROXKHDNN7KCTDU2WHFROXKHDNN7KC",
                contractID: "CNTRCT0412",
            },
            {
                iotdeviceID: "IoTbx00000000005",
                hostname: "https://boxchain-devices.net:3005",
                privateKey: "TDU2WHFROXKHDNN7KCTDU2WHFROXKHDNN7KC",
                contractID: "Not Assigned",
            },
        ]
    }
}

const mockContracts = {
    data: {
        contracts: [
            {
                contractID: "CNTRCT0412",
                toDeliver: "Pharma goods",
                deviceID: "Simulation",
                pickupAddress: "Address",
                deliveryAddress: "Address",
                temperature: "12C - 16C",
                humidity: "60%-70%",
                deliveryDueDate: "2018/09/05",
                contractStatus: "In Progress",
            },
            {
                contractID: "CNTRCT0412",
                toDeliver: "Pharma goods",
                deviceID: "Simulation",
                pickupAddress: "Address",
                deliveryAddress: "Address",
                temperature: "12C - 16C",
                humidity: "60%-70%",
                deliveryDueDate: "2018/09/05",
                contractStatus: "In Progress",
            },
            {
                contractID: "CNTRCT0412",
                toDeliver: "Pharma goods",
                deviceID: "Simulation",
                pickupAddress: "Address",
                deliveryAddress: "Address",
                temperature: "12C - 16C",
                humidity: "60%-70%",
                deliveryDueDate: "2018/09/05",
                contractStatus: "In Progress",
            },
            {
                contractID: "CNTRCT0412",
                toDeliver: "Pharma goods",
                deviceID: "Simulation",
                pickupAddress: "Address",
                deliveryAddress: "Address",
                temperature: "12C - 16C",
                humidity: "60%-70%",
                deliveryDueDate: "2018/09/05",
                contractStatus: "In Progress",
            },            
            {
                contractID: "CNTRCT0412",
                toDeliver: "Pharma goods",
                deviceID: "Simulation",
                pickupAddress: "Address",
                deliveryAddress: "Address",
                temperature: "12C - 16C",
                humidity: "60%-70%",
                deliveryDueDate: "2018/09/05",
                contractStatus: "In Progress",
            },
        ]
    }
}

// TODO: make working API )0))))
export default class Api {
    static async getAllDevices() {
        return mockDevices;
    }

    static async getAllContracts() {
        return mockContracts;
    }

    static async login(email, password) {
        localStorage.setItem('id_token', 'test');
    }

    static async logout() {
        localStorage.removeItem('id_token');
    }

    static async loggedIn() {
        return !!localStorage.getItem('id_token');
    }

    static async isTokenExpired() {
        return false;
    }
}