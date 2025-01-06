import { Prisma } from "@prisma/client";
import { CookieOptions, Request, Response } from "express";
import { TUser } from "../../types/user.type";
import { authService } from "./auth.service";
import { AppError } from "../../services/Error.service";
import path from "path";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export async function signUp(req: Request, res: Response) {}
export async function signIn(req: Request, res: Response) {}

export async function googleRedirect(req: Request, res: Response) {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
  res.redirect(googleAuthURL);
}

export async function googleCallback(req: Request, res: Response) {
  try {
    const url = new URL(req?.url);
    const code = url.searchParams.get("code");
    if (!code) {
      throw new Error("No code provided");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user information
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user information");
    }

    const userInfo = await userInfoResponse.json();

    const userToSave: TUser = {
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      imgUrl: userInfo.picture,
      phone: "",
    };
    let token = null;
    let user = null;
    try {
      const res = await authService.signIn(userToSave);
      user = res.user;
      token = res.token;
    } catch (error) {
      if (error instanceof AppError && error.statusCode === 404) {
        // User not found, attempt to sign up
        const res = await authService.signUp(userToSave);
        user = res.user;
      } else {
        // Other errors
        throw error;
      }
    }

    res.cookie("token", token, COOKIE);

    return res.redirect("/");
  } catch (error) {
    const err = AppError.create(`Error signing out${error}`, 500, true);
    res.status(err.statusCode).json(err);
  }
}

const COOKIE: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60, // 24 hours
};
