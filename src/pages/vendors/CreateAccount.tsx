import React, {FormEvent, useState} from "react";
import { Link } from "react-router-dom";
import ImageLight from "../../assets/img/create-account-office.jpeg";
import ImageDark from "../../assets/img/create-account-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Input, Label, Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import Language from "../../components/vendors/Language";
import axios from "../../axios/vendors/auth.axios";
import {ILoginResponse} from "../../interfaces/vendors/auth.interface";
import {setAuth, setUser} from "../../store/auth/authSlice";
import {useAppDispatch} from "../../store/hooks";
import {useToasts} from "react-toast-notifications";
function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
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
    axios.post<ILoginResponse>("register",{
      username:username,
      password:password
    }).then(resp=>{
      dispatch(setUser(resp.data.user));
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
      }
      dispatch(setAuth(1));
    }).catch(err=>{

      addToast(err.response.data, {
        appearance: 'error',
        autoDismiss: true,
      })
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
                  {t("Create account")}
                </h1>
                <Language />
              </div>

              <Label>
                <span>{t("Username")}</span>
                <Input
                  className="mt-1"
                  type="text"
                  onChange={changeEmailHandler}
                />
              </Label>
              <Label className="mt-4">
                <span>{t("Password")}</span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  onChange={changePasswordHandler}
                />
              </Label>
              {/*<Label className="mt-4">*/}
              {/*  <span>{t("Confirm password")}</span>*/}
              {/*  <Input*/}
              {/*    className="mt-1"*/}
              {/*    placeholder="***************"*/}
              {/*    type="password"*/}
              {/*    onChange={changePasswordHandler}*/}
              {/*  />*/}
              {/*</Label>*/}

              {/*<Label className="mt-6" check>*/}
              {/*  <Input type="checkbox" />*/}
              {/*  <span className="ms-2">*/}
              {/*    {t("I agree to the")}{" "}*/}
              {/*    <span className="underline">{t("privacy policy")}</span>*/}
              {/*  </span>*/}
              {/*</Label>*/}

              <Button type={"submit"} block className="mt-6">
                {t("Create account")}
              </Button>

              <hr className="my-8" />

              {/* <Button block layout="outline">
                <GithubIcon className="w-4 h-4 me-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 me-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  {t("Already have an account? Login")}
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
