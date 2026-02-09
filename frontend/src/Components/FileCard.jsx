import { File, FileText, Image, FileSpreadsheet } from "lucide-react";
import { getFileType } from "../Services/fileHelper";
import { useState } from "react";

export default function FileCard({ fileName, filePath }) {
  const [showPreview, setShowPreview] = useState(false);

  const API_BASE = "http://localhost:5000";
  const fileUrl = `${API_BASE}/${filePath}`;

  const type = getFileType(fileName);

  /* ===== FILE ICON SELECTION ===== */

  const renderIcon = () => {
    switch (type) {
      case "pdf":
        return <FileText size={40} className="text-danger" />;
      case "image":
        return <Image size={40} className="text-info" />;
      case "excel":
        return <FileSpreadsheet size={40} className="text-success" />;
      default:
        return <File size={40} />;
    }
  };

  return (
    <>
      {/* ===== FILE CARD ===== */}

      <div className="dark-card p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {renderIcon()}

          <div>
            <div className="fw-semibold">{fileName}</div>
            <small className="text-muted">{type.toUpperCase()} File</small>
          </div>
        </div>

        {/* ACTION BUTTONS */}

        <div className="d-flex gap-2">
          {type === "pdf" && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
          )}

          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-success btn-sm"
          >
            Open
          </a>
        </div>
      </div>

      {/* ===== PDF PREVIEW MODAL ===== */}

      {showPreview && type === "pdf" && (
        <div className="preview-backdrop" onClick={() => setShowPreview(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={fileUrl}
              width="100%"
              height="500px"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
