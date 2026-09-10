import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Alert, Input, Spin } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { usePostLogin } from "@/entities/auth/api/post-login.ts";
import { useAuthStore } from "@/entities/auth/model/store.ts";
import type { LoginInputs } from "@/pages/auth/type";
import CvedLogo from "@/shared/ui/icons/Cved";
import gerb from "/logo/gerb.svg";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = usePostLogin();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const logIn = useAuthStore((state) => state.logIn);
  const isDemoMode = !import.meta.env.VITE_BACKEND_HOST || import.meta.env.VITE_DEMO_MODE === "true";
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginInputs>({ defaultValues: { username: "", password: "" } });

  const onSubmit = (values: LoginInputs) => {
    if (isDemoMode) {
      if (values.username === "Jasur" && values.password === "123") {
        setAccessToken("demo-access-token");
        logIn();
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            username: "Jasur",
            first_name: "Alisher",
            last_name: "Ashuraliyev",
            role: "Demo administrator",
            phone: "998901234567"
          })
        );
        navigate("/dashboard", { replace: true });
        return;
      }

      setError("username", {
        type: "server",
        message: t("login.invalid_demo", "Demo login yoki parol noto'g'ri")
      });
      return;
    }

    loginMutation.mutate(values, {
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          t("errors.invalid_credentials", "Login yoki parol noto'g'ri");
        setError("username", { type: "server", message });
      }
    });
  };

  return (
    <main className="login-shell">
      <div className="login-backdrop" aria-hidden="true" />
      <div className="login-layout">
        <section className="login-intro">
          <div className="login-brand-mark">
            <img src={gerb} alt="O'zbekiston gerbi" />
          </div>
          <p className="login-eyebrow">CVED · CONTROL</p>
          <h1>{t("login.title", "Xush kelibsiz!")}</h1>
          <p className="login-intro-copy">
            {t(
              "login.subtitle",
              "Mehmonxonalarni boshqarish va mehmonlar ma'lumotlarini nazorat qilish uchun yagona platforma."
            )}
          </p>
          <div className="login-status">
            <span /> {t("login.system_active", "Tizim faol")}
          </div>
        </section>

        <section className="login-card" aria-labelledby="login-heading">
          <div className="login-card-brand">
            <CvedLogo className="login-cved-logo" aria-label="CVED" />
            <div>
              <p>{t("login.product", "Visitor Data")}</p>
              <span>{t("login.secure_workspace", "Secure workspace")}</span>
            </div>
          </div>
          <div className="login-card-heading">
            <h2 id="login-heading">{t("login.login", "Hisobga kirish")}</h2>
            <p>{t("login.subtitle_short", "Hisob ma'lumotlaringizni kiriting")}</p>
          </div>

          {isDemoMode && (
            <div className="login-demo-hint">
              {t("login.demo_hint", "Demo kirish: Jasur / 123")}
            </div>
          )}

          {errors.username?.type === "server" && (
            <Alert
              type="error"
              showIcon
              message={errors.username.message}
              className="mb-5"
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <label htmlFor="login-username">{t("login.email", "Login")}</label>
            <Controller
              name="username"
              control={control}
              rules={{ required: t("errors.email", "Loginni kiriting") }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="login-username"
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder={t("placeholder.email", "Login")}
                  status={errors.username?.type !== "server" && errors.username ? "error" : undefined}
                  autoComplete="username"
                />
              )}
            />
            {errors.username?.type !== "server" && errors.username && (
              <span className="login-error">{errors.username.message}</span>
            )}

            <label htmlFor="login-password">{t("login.password", "Parol")}</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: t("errors.password", "Parolni kiriting") }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="login-password"
                  size="large"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder={t("login.password_confirm", "Parol")}
                  status={errors.password ? "error" : undefined}
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && <span className="login-error">{errors.password.message}</span>}

            <button type="submit" className="login-submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? <Spin size="small" /> : t("login.login", "Hisobga kirish")}
            </button>
          </form>
          <p className="login-security">{t("login.security_note", "Kirish ma'lumotlari shifrlangan kanal orqali himoyalanadi.")}</p>
        </section>
      </div>
    </main>
  );
}
