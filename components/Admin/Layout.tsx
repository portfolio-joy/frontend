import { ToastContainer } from "react-toastify";
import Header from "../Dashboard/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false} />
            <Header />
            {children}
        </>
    )
}