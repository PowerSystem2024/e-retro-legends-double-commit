export const formatDate = (str) => {
  return new Date(str).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
