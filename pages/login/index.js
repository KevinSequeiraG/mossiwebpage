import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../lib/userAuthContext";
import Swal from "sweetalert2";

function Login() {
  const { logIn, logOut, changePassword } = useUserAuth();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [inputErrorLogin, setInputErrorLogin] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  //success or error notifications on top
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const Login = async () => {
    console.log(emailInput, passwordInput);
    await logIn(emailInput, passwordInput)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setInputErrorLogin(false);
        if (rememberMeChecked) {
          localStorage.setItem(
            "rememberMeCheck",
            JSON.stringify(rememberMeChecked)
          );
          localStorage.setItem(
            "rememberMeEmailInput",
            JSON.stringify(emailInput)
          );
        } else {
          localStorage.removeItem("rememberMeCheck");
          localStorage.removeItem("rememberMeEmailInput");
        }

        router.push("/");
      })
      .catch((error) => {
        console.log("email and password invalidos");
        setInputErrorLogin(true);
      });
  };

  const changePasswordUser = async () => {
    try {
      const user = await changePassword(emailInput);
      Toast.fire({
        icon: "success",
        title: `Correo enviado, revisa la casilla de spam`,
      });
      setForgotPasswordModal(false);
      setEmailInput("");
    } catch (error) {
      console.log(error.message);
      Toast.fire({
        icon: "error",
        title: `El correo digitado no existe`,
      });
    }
  };

  useEffect(() => {
    setRememberMeChecked(JSON.parse(localStorage.getItem("rememberMeCheck")));
    setEmailInput(JSON.parse(localStorage.getItem("rememberMeEmailInput")));
    logOut();
  }, []);

  return (
    <>
      <section className="h-screen bgMain min-h-screen overflow-auto">
        <div className="container px-6 py-12 h-full mx-auto w-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="w-11/12 md:w-8/12 lg:w-5/12 lg:ml-20 bg-white rounded-[10px]">
              <div className="p-4 lg:p-20 w-full">
                <h1 className="w-full text-center text-[16px] md:text-[1.5rem] lg:text-[2rem] text-black font-bold mb-5 lg:mb-10 leading-8 tracking-normal">
                  ¡Bienvenido(a) de vuelta!
                </h1>
                <div className="mb-6">
                  <input
                    type="text"
                    className={`block w-full px-4 py-2 text-[14px] lg:text-[16px] font-normal text-gray-700 bg-[#eeeeee55] border rounded-[20px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-300 focus:outline-none h-10 lg:h-auto ${
                      inputErrorLogin ? "border-red-500" : "border-solid"
                    }`}
                    placeholder="Correo electrónico"
                    onChange={(event) => setEmailInput(event.target.value)}
                    value={emailInput}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className={`block w-full px-4 py-2 text-[14px] lg:text-[16px] font-normal text-gray-700 bg-[#eeeeee55] border rounded-[20px] transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-300 focus:outline-none h-10 lg:h-auto ${
                      inputErrorLogin ? "border-red-500" : "border-solid"
                    }`}
                    placeholder="Contraseña"
                    onChange={(event) => setPasswordInput(event.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="items-center">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-3 lg:h-4 w-3 lg:w-4 border border-gray-700 rounded-[10px] checked:bg-red-500 focus:outline-none transition duration-200 mt-2 lg:mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-1 lg:mr-2 cursor-pointer"
                      id="flexCheckDefault"
                      checked={rememberMeChecked}
                      onChange={() => setRememberMeChecked(!rememberMeChecked)}
                    />
                    <label
                      className="inline-block text-black text-[13px] lg:text-[16px]"
                      htmlFor="flexCheckDefault"
                    >
                      Recuérdame
                    </label>
                  </div>
                  <a
                    onClick={() => setForgotPasswordModal(true)}
                    className="text-black hover:text-yellow-700 duration-200 transition ease-in-out text-[13px] lg:text-[16px]"
                  >
                    Olvidé mi contraseña
                  </a>
                </div>
                <em
                  className={`${
                    inputErrorLogin ? "visible" : "invisible"
                  } w-full text-center flex justify-center text-red-500 text-[13px] font-semibold`}
                >
                  Credenciales incorrectas
                </em>
                <button
                  onClick={Login}
                  type="button"
                  className="inline-block px-7 py-3 bgButtonLogin rounded-full text-white text-[16px] lg:text-[18px] font-medium text-sm leading-snug uppercase shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out w-full h-10 lg:h-auto"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password */}
      {forgotPasswordModal ? (
        <>
          <div className="invisible lg:visible fixed inset-0 bg-[#707070] bg-opacity-[0.35] transition-opacity"></div>

          <div
            id="password-modal"
            className={`h-3/6 lg:h-min flex justify-center flex-col bg-white w-full lg:w-2/6 absolute bottom-0 lg:bottom-1/3 lg:mx-auto lg:left-0 lg:right-0 px-6 lg:p-6 mt-8 lg:mt-0 animate__animated rounded-t-[20px] lg:rounded-[20px]`}
          >
            <button
              onClick={() => setForgotPasswordModal(false)}
              className="text-[2rem] absolute right-4 top-0"
            >
              ×
            </button>
            <h1 className="text-[18px] lg:text-[1.5rem] font-bold text-center">
              Recuperar contraseña
            </h1>
            <p className="tracking-normal leading-5 text-[14px] lg:text-[16px] text-[#8D8D8D] lg:mt-3 mt-2">
              Ingresa tu email, te llegará un mensaje de recuperación.
            </p>
            <h4 className="text-[14px] font-normal mt-4 ">
              Correo electrónico
            </h4>
            <input
              className="mt-2 border rounded-lg w-full px-4 py-2 h-10 border-solid border-gray-300"
              placeholder="ejemplo@gmail.com"
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
            ></input>
            {/* red alert */}
            <div className="bg-red-100 text-red-500 py-2 my-4 rounded-lg px-3 w-full">
              <p className="flex flex-row text-[12px] items-center text-center justify-center">
                <svg
                  id="Ico_Info"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24.753"
                  height="24.753"
                  viewBox="0 0 24.753 24.753"
                  className="mr-2"
                >
                  <path
                    id="Trazado_8"
                    data-name="Trazado 8"
                    d="M16.552,11.955a1.29,1.29,0,1,1,1.283,1.252A1.254,1.254,0,0,1,16.552,11.955Zm.088,2.235h2.392v9.022H16.639Z"
                    transform="translate(-5.465 -4.892)"
                    fill="#fe3a5c"
                  />
                  <path
                    id="Trazado_9"
                    data-name="Trazado 9"
                    d="M15.752,5.041A10.706,10.706,0,1,1,8.177,8.177a10.64,10.64,0,0,1,7.575-3.136m0-1.666A12.377,12.377,0,1,0,28.128,15.752,12.375,12.375,0,0,0,15.752,3.375Z"
                    transform="translate(-3.375 -3.375)"
                    fill="#fe3a5c"
                  />
                </svg>
                Revisa el Spam si no recibes el email.
              </p>
            </div>
            <button
              onClick={changePasswordUser}
              className="w-full btnButtonForgotPassword mt-2 text-white rounded-lg py-2"
            >
              Enviar
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Login;
