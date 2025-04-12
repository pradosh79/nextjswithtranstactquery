import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Wrapper from "./layout/wrapper/wrapper";
import { Toaster } from "react-hot-toast";


const queryClient = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (<QueryClientProvider client={queryClient}>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },

      }}
    />
    <Wrapper>
      <Component {...pageProps} />;
    </Wrapper>
  </QueryClientProvider>);
   
}

