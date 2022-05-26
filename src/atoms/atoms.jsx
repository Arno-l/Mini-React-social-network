import { atom } from "jotai";
import Cookies from 'js-cookie';

export const jwtAtom = atom(Cookies.get('token'));

export const userInfoAtom = atom( { username: "", email: "", password: "" });

export const idAtom = atom(null);