
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

export const showInformation = (title) => {
  Swal.fire({
    title: title,
    confirmButtonColor: "linear-gradient(90deg, #653de6 0%, #fc5185 100%)",
    confirmButtonText: "Confirm",
  });
};
