import Swal from "sweetalert2";

export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#4F46E5",
  });
};

export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#4F46E5",
  });
};

export const showLoadingAlert = (title = "Loading...") => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
