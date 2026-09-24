import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { loginRequest } from "../../../api/auth";
import { sessionStarted } from "../authSlice";
import { createFakeToken } from "../createFakeToken";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const rawUser = await loginRequest(values);
      
    //   const { password, ...safeUser } = rawUser;
      const safeUser = {
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    role: rawUser.role,
  };

      dispatch(
        sessionStarted({
          user: safeUser,
          token: createFakeToken(safeUser),
        }),
      );

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <label>
        Email
        <input type="email" {...register("email")} />
      </label>

      {errors.email && <p className="field-error">{errors.email.message}</p>}

      <label>
        Password
        <input type="password" {...register("password")} />
      </label>

      {errors.password && (
        <p className="field-error">{errors.password.message}</p>
      )}

      {serverError && <p className="field-error">{serverError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default LoginForm;
