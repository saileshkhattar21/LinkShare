export const getFileType = (filename) => {
  if (!filename) return "unknown";

  const ext = filename.split(".").pop().toLowerCase();

  if (["pdf"].includes(ext)) return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["xls", "xlsx"].includes(ext)) return "excel";

  return "file";
};
