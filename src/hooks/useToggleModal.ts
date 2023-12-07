// Import necessary hooks and dependencies
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";

// Custom hook to toggle modal based on user's visit
const useToggleModal = (): boolean => {
  // Access toggleModal and setToggleModal from the custom store
  const { toggleModal, setToggleModal } = useModalStore();

  // Effect to check user's visit and toggle modal accordingly
  useEffect(() => {
    // Check if the user has visited the page before
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // If not visited, set toggle modal and mark the page as visited
      setToggleModal(true);
      localStorage.setItem("hasVisited", "true");

      // Set expiration time (1 hour from now)
      const expirationTime = new Date().getTime() + 30 * 60 * 1000; // Thirty minutes in milliseconds
      localStorage.setItem("expirationTime", expirationTime.toString());
    } else {
      // If visited, check if the expiration time has passed
      const expirationTime = localStorage.getItem("expirationTime");
      const currentTime = new Date().getTime();

      if (expirationTime && currentTime > parseInt(expirationTime, 10)) {
        // If expiration time has passed, reset visited status and toggle modal
        localStorage.removeItem("hasVisited");
        localStorage.removeItem("expirationTime");
        setToggleModal(true);
      }
    }
  }, [setToggleModal]);

  // Return the current toggleModal value
  return toggleModal;
};

// Export the custom hook
export default useToggleModal;
