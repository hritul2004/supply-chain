import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
// INTERNAL IMPORT
import tracking from "../Context/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

// ---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => {
    return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
};

// Create Context
export const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
    // STATE VARIABLES
    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    // Create Shipment
    const createShipment = async (items) => {
        const { receiver, pickupTime, distance, price } = items;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, "ether"),
                { value: ethers.utils.parseUnits(price, "ether") }
            );

            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    // Get All Shipments
    const getAllShipment = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipments = await contract.getAllTransactions();

            return shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));
        } catch (error) {
            console.log("Error getting shipments", error);
        }
    };

    // Get Shipments Count
    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentsCount();
            return shipmentsCount.toNumber();
        } catch (error) {
            console.log("Error getting shipment count", error);
        }
    };

    // Complete Shipment
    const completeShipment = async ({ receiver, index }) => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(receiver, index, {
                gasLimit: 300000,
            });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("Error completing shipment", error);
        }
    };

    // Get Shipment
    const getShipment = async (index) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(index);

            return {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };
        } catch (error) {
            console.log("Error getting shipment", error);
        }
    };

    // Start Shipment
    const startShipment = async ({ receiver, index }) => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipment = await contract.startShipment(receiver, index);
            await shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("Error starting shipment", error);
        }
    };

    // Check if Wallet Connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log("Error checking wallet connection", error);
        }
    };

    // Connect Wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("Error connecting wallet", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};
