import { MouseEventHandler, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { rembg } from "../controller/rembg.controller";
import { FaDownload } from "react-icons/fa";

export default function ImageSlider() {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [transparentImage, setTransparentImage] = useState<File | null>(null);

  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
  };

  const handleClick: MouseEventHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (files.length === 0) return alert("Please insert an image to proceed.");

    const file = files[0].file;

    if (!file) throw new Error("Image is not a valid file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await rembg(formData);

      setOriginalImage(file);
      setTransparentImage(response.data);

      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Failed to remove background.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-[720px] aspect-video bg-white mx-4 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ease-linear relative">
        {transparentImage && originalImage && (
          <ReactCompareSlider
            className="w-full h-full"
            itemOne={
              <ReactCompareSliderImage
                src={URL.createObjectURL(originalImage)}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                className="bg-white pattern-dots pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20"
                src={URL.createObjectURL(transparentImage)}
              />
            }
          ></ReactCompareSlider>
        )}
        <Dropzone
          onChange={updateFiles}
          value={files}
          maxFiles={1}
          className="w-full h-full"
          accept="image/jpg, image/jpeg, image/png"
        >
          {files.map((file) => (
            <FileMosaic {...file} preview />
          ))}
        </Dropzone>
      </div>
      <div className=" mt-4 flex justify-center items-center flex-col gap-2">
        {!transparentImage && (
          <button
            className="bg-blue-500 text-white font-bold px-4 py-3 rounded-md disabled:opacity-40"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Remove Background"}
          </button>
        )}

        {transparentImage && (
          <>
            <a
              className="bg-blue-500 text-white font-bold px-4 py-3 rounded-md disabled:opacity-40 cursor-pointer flex items-center gap-2"
              href={URL.createObjectURL(transparentImage)}
              download="transparent-image.png"
            >
              <FaDownload />
              Download Image
            </a>

            <a
              className="text-sm underline text-blue-900 cursor-pointer decoration-dotted"
              href="/"
            >
              Try another image?
            </a>
          </>
        )}
      </div>
    </div>
  );
}
