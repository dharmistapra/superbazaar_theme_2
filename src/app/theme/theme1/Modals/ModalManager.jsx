"use client";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import OTPModal from "./OTPModal";
import ConfirmPasswordModal from "./ConfirmPasswordModal";

export default function ModalManager() {
  return (
    <>
      <LoginModal />
      <SignupModal />
      <ForgetPasswordModal />
      <OTPModal />
      <ConfirmPasswordModal />
    </>
  );
}
