import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Clients } from "../../extension/webResources/ClerkHQScraper";

// setSpeed context
export const ClerkClientContext = createContext<{
    clients: Clients | undefined;
    setClients: React.Dispatch<React.SetStateAction<Clients | undefined>>;
  }>({
    clients: undefined,
    setClients: () => {},
  });
  
  export const ClerkClientProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
     const [clients, setClients] = useState<Clients | undefined>();
    const ClientValue = useMemo(
      () => ({
        clients,
        setClients,
      }),
      [clients, setClients],
    );
    return (
      <ClerkClientContext.Provider value={ClientValue}>{children}</ClerkClientContext.Provider>
    );
  };
  
  const useClerkClients = () => {
    const context = useContext(ClerkClientContext);
    if (!context) {
      throw new Error("useSpeed must be used within a SpeedProvider");
    }
    return context;
  };
  
  export default useClerkClients;