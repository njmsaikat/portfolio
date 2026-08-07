"use client";

import Script from "next/script";
import { useEffect, HTMLAttributes } from "react";

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: { init: (opts: { xfbml: boolean; version: string }) => void };
  }
}

const PAGE_ID = "103446341405220";

// The Facebook xfbml chat plugin requires the non-standard `page_id` /
// `attribution` attributes (not `data-*`) on the element it parses.
const chatDivProps = {
  id: "fb-customer-chat",
  className: "fb-customerchat",
  page_id: PAGE_ID,
  attribution: "biz_inbox",
} as unknown as HTMLAttributes<HTMLDivElement>;

export function MessengerChat() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB?.init({ xfbml: true, version: "v10.0" });
    };
  }, []);

  return (
    <>
      <div id="fb-root" />
      <div {...chatDivProps} />
      <Script
        id="facebook-jssdk"
        src="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
        strategy="lazyOnload"
      />
    </>
  );
}
