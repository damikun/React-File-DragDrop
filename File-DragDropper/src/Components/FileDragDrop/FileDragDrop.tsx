import React, { useCallback, useEffect, useRef, useState } from "react";
import { HTTP_STATUS } from "../constants";
import axios, { AxiosRequestConfig } from "axios";
import ProgressBar from "../Progress/ProgressBar";
import StayledButton from "../Buttons/StayledButton";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faFileUpload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import CancleButton from "../Buttons/CancleButton";

export type ErrorType = "Network" | "Exception" | "FileError";

type functionFileDragDropProps = {
  onSuccess: (token: string, response: any) => void;
  onError: (
    type: ErrorType,
    error: string,
    object: any | undefined | null
  ) => void;
  api_RequestConfig?: AxiosRequestConfig;
  api_url: string;
  accept?: string;
  multiple?: boolean;
  variant?: "big" | "small";
};

export default function FileDragDrop({
  onSuccess,
  onError,
  api_RequestConfig,
  api_url,
  accept,
  multiple = false,
  variant = "big",
}: functionFileDragDropProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [source, setSource] = useState(axios.CancelToken.source());

  const divRef = useRef<HTMLDivElement>(null);

  function CancleRequest() {
    source?.cancel();
    let token = axios.CancelToken.source();
    setSource(token);
    setProgress(0);
    setIsSuccess(false);
    return token;
  }

  function upload(file: File, onUploadProgress: (progressEvent: any) => void) {
    let formData = new FormData();
    formData.append("file", file);

    const new_token = CancleRequest();

    return axios.post(api_url, formData, {
      ...api_RequestConfig,
      headers: api_RequestConfig
        ? api_RequestConfig.headers
        : {
            "Content-Type": "multipart/form-data",
          },
      withCredentials: api_RequestConfig
        ? api_RequestConfig.withCredentials
        : true,

      cancelToken: new_token.token,

      onUploadProgress,
    });
  }

  const onDragEnter = useCallback((e) => {
    if (e?.currentTarget?.contains(e.relatedTarget)) return;

    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();

    if (progress === 0 && !isVisible) setIsVisible(true);
  }, [progress,isVisible]);

  const onDragOver = useCallback((e) => {
    if (e?.currentTarget?.contains(e.relatedTarget)) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, []);

  const onDragLeave = useCallback((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();

    if (progress === 0) setIsVisible(false);
  }, [progress]);

  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSuccess === false && progress <= 0) {
      if (containsFiles(e) && e?.dataTransfer?.files)
        handleUpload(e?.dataTransfer?.files);
    }
  };

  const validate = useCallback(
    (files: Array<File>) => {
      if (accept) {
        try {
          if (multiple === true) {
            files.forEach((e) => {
              if (e && !validateType(e, accept)) {
                onError(
                  "FileError",
                  "One or more unsupported file types",
                  null
                );
                return false;
              }
            });
          } else {
            if (files.length > 1) {
              onError("FileError", "More than one files selected", null);
              return false;
            }

            if (files[0] && !validateType(files[0], accept)) {
              onError("FileError", "Unsupported file type", null);

              return false;
            }
          }
        } catch {
          onError("FileError", "Failed to validate file type", null);
          return false;
        }
      }

      return true;
    },
    [accept, multiple, onError]
  );


  const handleUpload = useCallback(
    (files: any) => {
      if (progress <= 0 && files) {
        if (!validate(files)) {
          return;
        }

        upload(multiple ? files : files[0], (event) => {
          if (event?.total !== 0) {
            setProgress(Math.round((100 * event?.loaded) / event?.total));
          }
        })
          .then((response) => {
            if (response?.status !== 200) {
              setProgress(0);
            }

            if (response) {
              switch (response.status) {
                case HTTP_STATUS.OK: // 200
                  onSuccess(response.data, response);
                  setIsSuccess(true);
                  break;
                default:
                  break;
              }
            } else {
              onError("Network", "Server bad request", null);
            }

            return;
          })
          .catch((error) => {
            setProgress(0);

            if (axios.isCancel(error)) {
              return;
            }

            if (error.status === HTTP_STATUS.BAD_REQUEST) {
              if (!axios.isCancel(error)) {
                onError("Exception", "Exception happend", error);
              }
            }

            switch (error.status) {
              case HTTP_STATUS.UNAUTHORIZED: // 401
                onError("Network", "Unauthorised", null);
                break;
              case HTTP_STATUS.INTERNAL_SERVER_ERROR: // 500
                onError("Network", "Internal server error", null);
                break;
              case HTTP_STATUS.BAD_REQUEST: // 400
                onError("Network", "Server bad request", null);
                break;
              default:
                // Default is 500
                onError("Network", "Server bad request", null);
                break;
            }
          });

        setIsVisible(false);
      }
    },
    [multiple, progress, validate, onError, onSuccess, upload]
  );


  const onFileSelect = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isSuccess === false && progress <= 0) {
        if (e?.target?.files) handleUpload(e?.target?.files);
      }
    },
    [progress,isSuccess,handleUpload]
  );



  useEffect(() => {
    const value = divRef.current;
    if (value) {
      value.addEventListener("dragleave", onDragLeave);
      value.addEventListener("dragenter", onDragEnter);
      value.addEventListener("dragover", onDragOver);
      value.addEventListener("drop", onDrop);
    }

    return () => {
      const value = divRef.current;

      if (value) {
        value.removeEventListener("dragleave", onDragLeave);
        value.removeEventListener("dragenter", onDragEnter);
        value.removeEventListener("dragover", onDragOver);
        value.removeEventListener("drop", onDrop);
      }
    };
  }, [onDragEnter, onDragLeave, onDragOver]);

  useEffect(() => {
    return () => {
      source?.cancel();
    };
  }, [source]);

  const inputFile = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full h-full" ref={divRef}>
      <div className="w-full h-full  ">
        <div
          className={clsx(
            "flex  h-full",
            "w-full items-center my-auto mx-auto"
          )}
        >
          <div className="flex flex-col gap-y-1 font-semibold mx-auto text-center">
            <div
              className={clsx(
                "mx-auto text-2xl",
                isVisible && !isSuccess && "animate-bounce",
                progress > 0 && !isSuccess && "animate-spin"
              )}
            >
              <FontAwesomeIcon
                icon={
                  progress === 0
                    ? faFileUpload
                    : isSuccess
                    ? faCheckCircle
                    : faSpinner
                }
              />
            </div>
            {variant && variant === "big" && (
              <>
                <GetProgress
                  progress={progress}
                  isSuccess={isSuccess}
                  multiple={multiple} />

                <div className={clsx("relative")}>
                  {progress <= 0 ? (
                    <>
                      <input
                        style={{ display: "none" }}
                        accept={accept}
                        ref={inputFile}
                        onChange={onFileSelect}
                        type="file"
                        multiple={multiple}
                        value=""
                      />
                      <StayledButton
                        type="button"
                        onClick={() => inputFile?.current?.click()}
                        variant="primaryblue"
                      >
                        Select
                      </StayledButton>
                    </>
                  ) : (
                    <div className="flex flex-row flex-nowrap gap-x-1 w-32 md:w-40">
                      <ProgressBar
                        className="my-auto"
                        value={progress}
                        barOnly
                      />

                      <CancleButton onClick={CancleRequest} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/////////////////////////////////
/// Helpers
/////////////////////////////////


type GetProgressProps = {
  progress:number,
  isSuccess:boolean,
  multiple:boolean
}

function GetProgress({progress,multiple,isSuccess}:GetProgressProps){
 return  <div>
  {progress <= 0
    ? multiple
      ? "Drop files to Upload"
      : "Drop file to Upload"
    : progress >= 100
    ? isSuccess
      ? "Success"
      : "Validating"
    : "Uploading"}
</div>
}


//////////////////////////////////////////////////

function containsFiles(event: any) {
  if (event.dataTransfer.types) {
    for (var i = 0; i < event.dataTransfer.types.length; i++) {
      if (event.dataTransfer.types[i] === "Files") {
        return true;
      }
    }
  }
  return false;
}

//////////////////////////////////////////////////


function validateType(file: File, accept: string) {
  if (file && accept) {
    const supported_types = accept.split(",");
    return supported_types.includes(file.type);
  }
  return false;
}
