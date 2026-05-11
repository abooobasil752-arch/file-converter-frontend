import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  File,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  X,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/custom-buttons";
import { cn } from "@/lib/utils";

type ConversionType =
  | "docx_to_pdf"
  | "pdf_to_docx"
  | "image_to_pdf"
  | "merge_pdf"
  | "split_pdf";

const conversionTypes: { id: ConversionType; label: string }[] = [
  { id: "docx_to_pdf", label: "DOCX → PDF" },
  { id: "pdf_to_docx", label: "PDF → DOCX" },
  { id: "image_to_pdf", label: "Image → PDF" },
  { id: "merge_pdf", label: "Merge PDFs" },
  { id: "split_pdf", label: "Split PDF" },
];

export default function ConverterSection() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState<ConversionType | null>(null);
  const [state, setState] = useState<
    "idle" | "dragging" | "processing" | "success" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState("converted-file");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(
    "Conversion failed. Try again.",
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMergeMode = type === "merge_pdf";
  const isSplitMode = type === "split_pdf";

  const selectedCount = isMergeMode ? files.length : file ? 1 : 0;
  const canConvert = isMergeMode ? files.length >= 2 : !!file && !!type;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (state !== "processing") setState("dragging");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (state !== "processing") setState("idle");
  };

  const setSelectedFiles = (selectedFiles: FileList | File[]) => {
    const list = Array.from(selectedFiles);

    if (isMergeMode) {
      setFiles(list);
      setFile(null);
    } else {
      setFile(list[0] || null);
      setFiles([]);
    }

    setState("idle");
    setDownloadUrl(null);
    setDownloadName("converted-file");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (state === "processing") return;
    setSelectedFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleTypeChange = (newType: ConversionType) => {
    setType(newType);
    setFile(null);
    setFiles([]);
    setState("idle");
    setProgress(0);
    setStartPage(1);
    setEndPage(1);

    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setDownloadName("converted-file");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getOutputFileName = (
    inputName: string,
    conversionType: ConversionType,
  ) => {
    const baseName = inputName.replace(/\.[^/.]+$/, "");

    switch (conversionType) {
      case "docx_to_pdf":
        return `${baseName}.pdf`;
      case "pdf_to_docx":
        return `${baseName}.docx`;
      case "image_to_pdf":
        return `${baseName}.pdf`;
      case "merge_pdf":
        return "merged.pdf";
      case "split_pdf":
        return `${baseName}-pages-${startPage}-to-${endPage}.pdf`;
      default:
        return `converted-${inputName}`;
    }
  };

  const handleConvert = async () => {
    if (!type) return;

    if (isMergeMode && files.length < 2) {
      setErrorMessage("Please upload at least 2 PDF files for merge.");
      setState("error");
      return;
    }

    if (!isMergeMode && !file) return;

    setState("processing");
    setProgress(0);
    setErrorMessage("Conversion failed. Try again.");

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append("conversion_type", type);

      if (isMergeMode) {
        files.forEach((pdfFile) => {
          formData.append("files", pdfFile);
        });
      } else if (file) {
        formData.append("file", file);
      }

      if (isSplitMode) {
        formData.append("start_page", String(startPage));
        formData.append("end_page", String(endPage));
      } else {
        formData.append("start_page", "1");
        formData.append("end_page", "1");
      }

      const res = await fetch("https://file-converter-pro-q3a9.onrender.com/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.error || "Conversion failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);

      setDownloadUrl(url);
      setDownloadName(
        isMergeMode
          ? "merged.pdf"
          : getOutputFileName(file?.name || "converted-file", type),
      );

      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setState("success"), 500);
    } catch (err) {
      clearInterval(interval);
      setErrorMessage(
        err instanceof Error ? err.message : "Conversion failed. Try again.",
      );
      setState("error");
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const reset = () => {
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl);
    }

    setDownloadUrl(null);
    setDownloadName("converted-file");
    setFile(null);
    setFiles([]);
    setType(null);
    setState("idle");
    setProgress(0);
    setStartPage(1);
    setEndPage(1);
    setErrorMessage("Conversion failed. Try again.");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center" id="converter">
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-white">The Forge</h2>
        <p className="text-muted-foreground">
          Select your input file and target format. The forge handles the rest
          locally and securely.
        </p>
      </div>

      <div className="w-full max-w-4xl glass-panel rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-card flex items-center justify-center text-white border border-white/10">
                1
              </span>
              Input File
            </h3>

            <div
              className={cn(
                "relative flex-1 flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all duration-300 min-h-[250px] cursor-pointer",
                state === "dragging"
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-white/20 bg-background/50 hover:border-white/40",
                selectedCount > 0 && "border-secondary/50 bg-secondary/5",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple={isMergeMode}
                accept={isMergeMode || isSplitMode ? ".pdf" : undefined}
              />

              <AnimatePresence mode="wait">
                {selectedCount === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-card border border-white/5 flex items-center justify-center mb-4 shadow-lg">
                      <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {isMergeMode
                        ? "Drag & drop 2 or more PDF files"
                        : "Drag & drop your file here"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      or click to browse
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className="w-16 h-16 rounded-xl bg-card border border-secondary/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <File className="w-8 h-8 text-secondary" />
                    </div>

                    {isMergeMode ? (
                      <>
                        <p className="text-sm font-bold text-white">
                          {files.length} PDF files selected
                        </p>
                        <div className="mt-3 max-h-24 overflow-y-auto text-xs text-muted-foreground space-y-1">
                          {files.map((f) => (
                            <p
                              key={`${f.name}-${f.size}`}
                              className="truncate max-w-[220px]"
                            >
                              {f.name}
                            </p>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-white truncate max-w-[220px]">
                          {file?.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {file ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB
                        </p>
                      </>
                    )}

                    {state !== "processing" && state !== "success" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setFiles([]);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground hover:text-white" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-card flex items-center justify-center text-white border border-white/10">
                2
              </span>
              Target Format
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {conversionTypes.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => handleTypeChange(ct.id)}
                  disabled={state === "processing" || state === "success"}
                  className={cn(
                    "p-4 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1",
                    type === ct.id
                      ? "border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      : "border-white/10 bg-card hover:border-white/30 hover:bg-white/5",
                    (state === "processing" || state === "success") &&
                      "opacity-50 cursor-not-allowed",
                  )}
                >
                  <span className="text-sm font-bold text-white">
                    {ct.label}
                  </span>
                </button>
              ))}
            </div>

            {isSplitMode && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    Start page
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={startPage}
                    onChange={(e) => setStartPage(Number(e.target.value))}
                    className="rounded-lg border border-white/10 bg-card px-3 py-2 text-white outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    End page
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={endPage}
                    onChange={(e) => setEndPage(Number(e.target.value))}
                    className="rounded-lg border border-white/10 bg-card px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
              {state === "idle" && (
                <PrimaryButton
                  onClick={handleConvert}
                  disabled={!canConvert}
                  className={cn(
                    "w-full",
                    !canConvert && "opacity-50 grayscale cursor-not-allowed",
                  )}
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Ignite Conversion
                </PrimaryButton>
              )}

              {state === "processing" && (
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-primary animate-pulse">
                      Processing...
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {state === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-secondary bg-secondary/10 p-3 rounded-md border border-secondary/20">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-bold">
                      Conversion Complete
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <PrimaryButton
                      onClick={handleDownload}
                      className="flex-1 bg-gradient-to-r from-secondary to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Result
                    </PrimaryButton>
                    <button
                      onClick={reset}
                      className="p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              )}

              {state === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                  <SecondaryButton onClick={reset} className="w-full">
                    Reset
                  </SecondaryButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
