import { useState, useEffect } from "react";

export default ({ getModel, setGetModel, getShipment }) => {
  const [index, setIndex] = useState(0); // State for index
  const [singleShipmentData, setSingleShipmentData] = useState(null); // State for single shipment data

  // Function to fetch shipment data based on index
  const getShipmentData = async () => {
    try {
      const getData = await getShipment(index); // Call getShipment with the index
      setSingleShipmentData(getData); // Update state with the fetched data
      console.log(getData); // Log data for debugging
    } catch (error) {
      console.log("Error fetching shipment data:", error); // Handle error
    }
  };

  // Function to convert time to a formatted string
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dataTime;
  };

  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setGetModel(false)} // Close the modal when clicking outside
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setGetModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 11-1.414-1.414L8.586 10 4.293 4.293a1 1 0 011.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">Product Tracking Details</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Input for Shipment ID */}
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)} // Update index value
                />
              </div>

              {/* Button to Fetch Shipment Data */}
              <button
                type="button"
                onClick={getShipmentData} // Trigger data fetching
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Get Details
              </button>
            </form>

            {/* Display Shipment Data if available */}
            {singleShipmentData ? (
              <div className="text-left mt-4">
                <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                <p>Receiver: {singleShipmentData.receiver.slice(0, 25)}...</p>
                <p>Pickup Time: {convertTime(singleShipmentData.pickupTime)}</p>
                <p>Delivery Time: {convertTime(singleShipmentData.deliveryTime)}</p>
                <p>Distance: {singleShipmentData.distance} km</p>
                <p>Price: ${singleShipmentData.price}</p>
                <p>Status: {singleShipmentData.status}</p>
                <p>Paid: {singleShipmentData.isPaid ? "Completed" : "Not Complete"}</p>
              </div>
            ) : (
              <p>No shipment data available.</p> // Message when no data is found
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null; // Return null if getModel is false, meaning modal is closed
};
