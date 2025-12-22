import * as z from "zod";
const TITLE_ERROR = "タイトルに1〜20文字以内で入力してください。";
const CONTENT_ERROR = "内容に1〜250文字以内で入力してください。";
export const todoTitleSchema = z
  .string()
  .min(1, { error: TITLE_ERROR })
  .max(20, { error: TITLE_ERROR });
export const todoContentSchema = z
  .string()
  .min(1, { error: CONTENT_ERROR })
  .max(250, { error: CONTENT_ERROR });

const EMAIL_ERROR = "이메일 형식이 올바르지 않습니다.";
const PASSWORD_ERROR = "패스워드는 8~20자여야 합니다.";
const USERNAME_ERROR = "유저명은 4~12자여야 합니다.";

export const emailSchema = z.email({ error: EMAIL_ERROR });
export const passwordSchema = z
  .string()
  .min(8, { error: PASSWORD_ERROR })
  .max(20, { error: PASSWORD_ERROR });
export const usernameSchema = z
  .string()
  .min(6, { error: USERNAME_ERROR })
  .max(12, { error: USERNAME_ERROR });
