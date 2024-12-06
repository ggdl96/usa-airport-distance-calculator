"use client";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorDisplay({
  display,
  message,
  onClose,
}: {
  display: boolean;
  message: string;
  onClose: () => void,
}) {
  return display ? (
    <div className="w-full md:w-2/3 lg:1/2 bg-foreground absolute top-[50vh] justify-items-center p-4 rounded-md">
      <div className="w-full flex flex-row justify-end">
        <button onClick={onClose}>
          <CloseIcon color="primary" />
        </button>
      </div>
      <h2 className="text-input text-lg font-bold pb-2">Error</h2>
      <p className="text-error">{message}</p>
    </div>
  ) : null;
}
