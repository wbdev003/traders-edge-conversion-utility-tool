// Import necessary dependencies
"use client";
import { useEffect } from "react";
import Router from "next/router";

// Custom hook for handling leave page warning
const useLeavePageWarning = (notSaved: boolean) => {
  useEffect(() => {
    // Define the confirmation message
    const confirmationMessage = "Changes you made may not be saved.";

    // Handler for beforeunload event
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    };

    // Handler for route change start event
    const beforeRouteHandler = (url: string) => {
      if (Router.pathname !== url && !window.confirm(confirmationMessage)) {
        // Abort route change and show an error
        // to inform NProgress or something ...
        Router.events.emit("routeChangeError");
        throw new Error(
          `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`
        );
      }
    };

    // Add event listeners based on the notSaved flag
    if (notSaved) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      Router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    }

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [notSaved]);
};

// Export the custom hook
export default useLeavePageWarning;
