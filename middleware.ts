import createMiddleware from "next-intl/middleware";
import { locales } from "./src/i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",

  // Domains can be used for language-specific domains
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.pt',
  //     defaultLocale: 'pt'
  //   }
  // ]
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*"],
};
