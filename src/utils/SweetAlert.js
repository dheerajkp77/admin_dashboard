
import Swal from "sweetalert2";
export const toastAlert = (icon, title) => {
  Swal.fire({
    toast: true,  
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3000,
  });
};
