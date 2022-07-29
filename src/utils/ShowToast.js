import { toast } from "react-toastify";

const ShowToast = (name, type) => {
    toast[type](name, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export default ShowToast
