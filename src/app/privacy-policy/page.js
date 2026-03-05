import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Surgo Studios",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-gradient-to-b from-black via-[#0a0a0a] to-black text-gray-300 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-28 pb-16 text-center">

        <Link href="/" className="inline-block mb-10">
          <Image
            src="https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png"
            alt="Surgo Studios"
            width={220}
            height={70}
            className="mx-auto"
          />
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-400 text-sm">
          Last updated: March 2026
        </p>

        <div className="w-24 h-[2px] bg-yellow-400 mx-auto mt-6" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 sm:px-12 pb-24 space-y-10 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Introduction
          </h2>
          <p>
            Surgo Studios respects your privacy and is committed to protecting
            any personal information you share with us. This policy explains
            how we collect, use, and safeguard your information when you visit
            our website or contact us regarding our video production services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, phone number, company name, and project details when you
            contact us or submit forms through our website.
          </p>
          <p className="mt-3">
            We may also collect technical information such as browser type,
            device information, IP address, and pages visited to improve the
            functionality and performance of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to inquiries and project requests</li>
            <li>Provide quotes and service information</li>
            <li>Improve website performance and usability</li>
            <li>Analyze traffic through analytics tools</li>
            <li>Communicate with clients and collaborators</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Cookies & Analytics
          </h2>
          <p>
            Our website may use cookies and analytics services such as Google
            Analytics to understand how visitors interact with the site and to
            improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Client Media
          </h2>
          <p>
            As a video production company, Surgo Studios may work with
            client-provided footage, assets, or creative materials. These
            materials are treated as confidential and used only for the agreed
            production work unless permission is granted for portfolio or
            promotional use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Contact
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact:
          </p>

          <p className="mt-2 text-yellow-400">
            Raha@surgomedia.com
          </p>

          <p>150 Elgin St, Ottawa, ON, Canada K2P 1L4</p>
        </section>

      </div>
    </main>
  );
}