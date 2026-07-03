"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialButton } from "@/components/auth/SocialButton";
import { Divider } from "@/components/auth/Divider";
import { useLogin } from "@/hooks/use-login";

// ─── Animation variants ──────────────────────────────────────────────────────
const formItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function LoginForm() {
  const { form, isLoading, onSubmit, handleSocialLogin, handleForgotPassword } =
    useLogin();

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const rememberMe = watch("rememberMe");

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {/* ── Social buttons ──────────────────────────────────────── */}
      <motion.div
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="grid grid-cols-2 gap-3 w-full"
      >
        <SocialButton
          provider="google"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        />
        <SocialButton
          provider="github"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
        />
      </motion.div>

      <Divider text="or continue with email" />

      {/* ── Email field ─────────────────────────────────────────── */}
      <motion.div
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="space-y-2"
      >
        <Label htmlFor="login-email">Email</Label>
        <div className="relative flex items-center">
          <Mail className="absolute left-3.5 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className="h-11 rounded-xl pl-10"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p
            id="login-email-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </motion.div>

      {/* ── Password field ──────────────────────────────────────── */}
      <motion.div
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
        <PasswordInput
          id="login-password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          className="h-11 rounded-xl"
          {...register("password")}
        />
        {errors.password && (
          <p
            id="login-password-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </motion.div>

      {/* ── Remember me ─────────────────────────────────────────── */}
      <motion.div
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="flex items-center gap-2"
      >
        <Checkbox
          id="login-remember"
          checked={rememberMe}
          onCheckedChange={(checked) =>
            setValue("rememberMe", checked === true)
          }
          aria-label="Remember me"
        />
        <Label
          htmlFor="login-remember"
          className="text-sm font-normal text-muted-foreground cursor-pointer"
        >
          Remember me
        </Label>
      </motion.div>

      {/* ── Submit button ───────────────────────────────────────── */}
      <motion.div
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl bg-purple-600 font-semibold text-white shadow-md transition-all hover:bg-purple-700 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>

      {/* ── Footer link ─────────────────────────────────────────── */}
      <motion.p
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
        custom={5}
        className="text-center text-sm text-muted-foreground"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
        >
          Sign up
        </Link>
      </motion.p>
    </form>
  );
}
