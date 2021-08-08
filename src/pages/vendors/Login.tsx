import React, {FormEvent, useState} from "react";
import { Link } from "react-router-dom";
import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { setAuth, setUser } from "../../store/auth/authSlice";

import { Label, Input, Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import Language from "../../components/vendors/Language";
import axios from "../../axios/vendors/auth.axios";
import {useAppDispatch} from "../../store/hooks";
import {ILoginResponse} from "../../interfaces/vendors/auth.interface";
import {useToasts} from "react-toast-notifications";

function Login() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { addToast } = useToasts()


  const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePasswordHandler = (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    axios.post<ILoginResponse>("/auth/login",{
      username:username,
      password:password
    }).then(resp=>{
      console.log(resp)
      dispatch(setUser(resp.data.user));
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
      }
      dispatch(setAuth(1));
    }).catch(err=>{
      console.log(err.response)
      if(err?.response?.data?.message){
        addToast(err.response.data.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      }

    })
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={submitHandler}>
              <div className="flex items-baseline justify-between">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  {t("Login")}
                </h1>
                <Language />
              </div>

              <Label>
                <span>{t("Username")}</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder=""
                  onChange={changeEmailHandler}
                />
              </Label>

              <Label className="mt-4">
                <span>{t("Password")}</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  onChange={changePasswordHandler}
                />
              </Label>

              <Button className="mt-4" block  type={"submit"}>
                {t("Log in")}
              </Button>

              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 me-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 me-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  {t("Forgot your password ?")}
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  {t("Create account")}
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Login;
