//Firebase imports
import { storage } from "../../../lib/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

//Common imports
import { useState } from "react";

export default function ImageUplaod({
  profilePicture,
  setImageValue,
  setImageUrl,
  imageUrl,
  containerClassName,
  registerImage,
  inputDisabled,
}) {
  const [progress, setProgress] = useState(0);
  const [fileLoadingAnimation, setFileLoadingAnimation] = useState(false);
  const handlerChange = async (e) => {
    //Add files to the database
    const file = e.target.files[0];
    if (file) {
      setImageValue(file);
      const storageRef = ref(storage, `docs/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      //Get the URL of the entered file and store it in a const to later add it to the corresponding campaign
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setFileLoadingAnimation(true);
          const pro = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pro);
        },
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
            setFileLoadingAnimation(false);
          });
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full relative ">
      <label className={containerClassName}>
        <div
          className={`flex justify-center items-center w-full h-full ${
            inputDisabled ? "" : "cursor-pointer"
          }`}
        >
          {profilePicture ? (
            <>
              {fileLoadingAnimation ? (
                <div
                  className="inline-block w-[40px] h-[40px] mt-1
                border-t-8 
                border-t-[#35CA75]  
                rounded-full 
                animate-spin"
                ></div>
              ) : (
                <>
                  {imageUrl ? (
                    <>
                      <img
                        alt="Foto de perfil"
                        className="w-full h-full rounded-full object-cover"
                        src={`${imageUrl}`}
                      ></img>
                      <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full rounded-full opacity-0 hover:opacity-100 !bg-[#707070] !bg-opacity-60 transition delay-75 duration-300">
                        <div className="flex flex-col items-center justify-center">
                          <svg
                            className="w-[21px] h-[19px] md:w-[35px] md:h-[32px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.825"
                            height="16.825"
                            viewBox="0 0 16.825 16.825"
                          >
                            <path
                              id="Icon_material-edit"
                              data-name="Icon material-edit"
                              d="M4.5,17.817v3.5H8L18.341,10.985l-3.5-3.5ZM21.052,8.274a.931.931,0,0,0,0-1.318L18.865,4.77a.931.931,0,0,0-1.318,0l-1.71,1.71,3.5,3.5Z"
                              transform="translate(-4.5 -4.496)"
                              fill="#fff"
                            />
                          </svg>

                          <p className="font-Inter text-[9px] text-center md:text-[16px] text-white tracking-normal leading-3 md:leading-5 font-semibold w-10/12 mt-2">
                            Editar foto de perfil
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-[21px] h-[19px] md:w-[35px] md:h-[32px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21.155 19.316"
                      >
                        <path
                          id="Icon_material-add-a-photo"
                          d="M2.759,4.259V1.5H4.6V4.259H7.358V6.1H4.6V8.858H2.759V6.1H0V4.259ZM5.519,9.778V7.019H8.278V4.259h6.439L16.4,6.1h2.916a1.845,1.845,0,0,1,1.84,1.84V18.976a1.845,1.845,0,0,1-1.84,1.84H4.6a1.845,1.845,0,0,1-1.84-1.84v-9.2Zm6.439,8.278a4.6,4.6,0,1,0-4.6-4.6A4.6,4.6,0,0,0,11.957,18.056Zm-2.943-4.6a2.943,2.943,0,1,0,2.943-2.943A2.94,2.94,0,0,0,9.014,13.457Z"
                          transform="translate(0 -1.5)"
                          fill="#899592"
                        />
                      </svg>
                      <p className="font-Inter text-[9px] text-center md:text-[16px] text-[#899592] tracking-normal leading-3 md:leading-5 font-semibold w-10/12 mt-2">
                        Subir foto de perfil
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {fileLoadingAnimation ? (
                <div
                  className="inline-block w-[40px] h-[40px] mt-1
                border-t-8 
                border-t-[#35CA75]  
                rounded-full 
                animate-spin"
                ></div>
              ) : imageUrl ? (
                <>
                  <img
                    alt="Imagen de portada"
                    className="w-full h-full rounded-[10px] object-cover"
                    src={`${imageUrl}`}
                  ></img>
                  {inputDisabled ? null : (
                    <div className="absolute flex justify-center items-center  left-0 h-20 w-full rounded-[10px] opacity-0 hover:opacity-100 !bg-[#707070] !bg-opacity-60 transition delay-75 duration-300">
                      <div className="flex flex-col items-center justify-center ">
                        <svg
                          className="w-[21px] h-[19px] md:w-[20px] md:h-[20px] mb-1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.825"
                          height="16.825"
                          viewBox="0 0 16.825 16.825"
                        >
                          <path
                            id="Icon_material-edit"
                            data-name="Icon material-edit"
                            d="M4.5,17.817v3.5H8L18.341,10.985l-3.5-3.5ZM21.052,8.274a.931.931,0,0,0,0-1.318L18.865,4.77a.931.931,0,0,0-1.318,0l-1.71,1.71,3.5,3.5Z"
                            transform="translate(-4.5 -4.496)"
                            fill="#fff"
                          />
                        </svg>

                        <p className="font-Inter text-[9px] text-center md:text-[13px] text-white tracking-normal leading-3 md:leading-5 font-semibold w-10/12">
                          Editar imagen de portada
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center">
                  <svg
                    xmlns={"http://www.w3.org/2000/svg"}
                    className="ml-3"
                    width="20.75"
                    height="20.75"
                    viewBox="0 0 20.75 20.75"
                  >
                    <path
                      id="Icon_ionic-md-add-circle"
                      d="M13.75,3.375A10.375,10.375,0,1,0,24.125,13.75,10.375,10.375,0,0,0,13.75,3.375ZM19.087,14.8H14.8v4.29H12.7V14.8H8.413V12.7H12.7V8.413H14.8V12.7h4.29Z"
                      transform="translate(-3.375 -3.375)"
                      fill="#899592"
                    />
                  </svg>
                  <p className="font-Inter text-[14px] text-[#8D8D8D] tracking-tight leading-5 px-3">
                    {registerImage
                      ? "JPG, PNG 790x155px"
                      : "Añade un archivo JPG, PNG - 5MB max - 790x155px"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <input
          accept="image/*"
          type="file"
          className="hidden"
          onChange={inputDisabled ? null : handlerChange}
          disabled={fileLoadingAnimation == true ? true : false}
        />
      </label>
    </div>
  );
}
