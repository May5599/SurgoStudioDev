import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Surgo Studios",
};

export default function TermsPage() {
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
          Terms & Conditions
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
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using the Surgo Studios website, you agree to
            comply with these Terms & Conditions. If you do not agree with
            these terms, please discontinue use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Website Content
          </h2>
          <p>
            All content displayed on this website including videos, images,
            branding, text, graphics, and other materials are the intellectual
            property of Surgo Studios unless otherwise stated. Unauthorized
            reproduction, copying, or distribution of any content is strictly
            prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Portfolio & Media Usage
          </h2>
          <p>
            Surgo Studios may showcase completed projects, visuals, or video
            content in its portfolio, website, and promotional materials unless
            otherwise restricted by written agreement with the client.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Client Projects
          </h2>
          <p>
            All production services, deliverables, timelines, and licensing
            agreements are governed by separate written contracts between
            Surgo Studios and its clients. These Terms & Conditions do not
            replace formal service agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Third-Party Links
          </h2>
          <p>
            This website may contain links to third-party websites or services.
            Surgo Studios is not responsible for the content, policies, or
            practices of those external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Limitation of Liability
          </h2>
          <p>
            Surgo Studios shall not be held liable for any damages or losses
            resulting from the use or inability to use this website or any
            information provided on it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Changes to Terms
          </h2>
          <p>
            Surgo Studios reserves the right to modify these Terms &
            Conditions at any time. Updates will be posted on this page with
            the revised date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            Contact Information
          </h2>
          <p>
            If you have questions regarding these Terms & Conditions,
            please contact:
          </p>

          <p className="mt-3 text-yellow-400">
            Raha@surgomedia.com
          </p>

          <p>
            150 Elgin St, Ottawa, ON, Canada K2P 1L4
          </p>
        </section>

      </div>

    </main>
  );
}