import React from "react";

/**
 * PublicHealthInfoPage.jsx
 * Single-file, hard-coded, Tailwind-styled React component with images.
 *
 * Usage: drop into a Create-React-App or Vite project that already has Tailwind configured.
 */

export default function PublicHealthInfoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Top navigation / header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Simple logo */}
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-emerald-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 2v20M2 12h20"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                Public Health Information
              </h1>
              <p className="text-xs text-slate-500">Static informational page • Privacy & guidance</p>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            <span className="hidden sm:inline">Last updated:</span>{" "}
            <span className="font-medium text-slate-700">April 2025</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Static page with general health information and privacy policy
            </h2>
            <p className="text-slate-700 leading-relaxed">
              This page provides concise, evidence-informed guidance on everyday
              prevention, healthy living, and when to seek care. It is a static,
              read-only resource intended for general public education.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="#information"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-sm hover:bg-emerald-700"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="#privacy"
                className="text-sm text-slate-600 underline"
              >
                Privacy policy
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="rounded-xl overflow-hidden shadow-md bg-white">
            <img
              src="https://images.unsplash.com/photo-1584036561584-b03c19da874c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b6d9fdea4b6a7f6b8b8f5b0b1c87f7c"
              alt="Health professionals discussing public health data"
              className="w-full h-72 object-cover"
            />
          </div>
        </section>

        {/* Info grid */}
        <section id="information" className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582719478176-1c7a6b2b3c09?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=8c8b6d8f0a2c9c1b7f1b7c8a9a3e4a1e"
              alt="Washing hands under running water"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">Everyday Prevention</h3>
              <p className="mt-2 text-sm text-slate-600">
                Simple actions — hand hygiene, respiratory etiquette, and staying home when sick —
                reduce the spread of infections in the community.
              </p>
              <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
                <li>Wash hands for at least 20 seconds.</li>
                <li>Cover coughs, dispose of tissues safely.</li>
                <li>Use hand sanitizer when needed.</li>
              </ul>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b0b9b6f9f8a5b4c3d2e1f0a9b8c7d6e"
              alt="People exercising outdoors"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">Healthy Lifestyle</h3>
              <p className="mt-2 text-sm text-slate-600">
                Balanced nutrition, regular physical activity, and adequate sleep support long-term health.
              </p>
              <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
                <li>Aim for 150 min of moderate activity weekly.</li>
                <li>Choose whole foods and limit processed items.</li>
                <li>Prioritize sleep and stress management.</li>
              </ul>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1d3b5b964b1f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=297d1f1b8e7c7a9e4d5b6c7a8f9e3d2c"
              alt="Medical consultation and vaccination"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">Vaccination & Screening</h3>
              <p className="mt-2 text-sm text-slate-600">
                Follow recommended vaccination schedules and routine screenings to prevent disease and detect conditions early.
              </p>
              <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
                <li>Discuss vaccines with your provider.</li>
                <li>Keep a personal health record of screenings.</li>
              </ul>
            </div>
          </article>
        </section>

        {/* Detailed section */}
        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold">When to Seek Medical Care</h3>
            <p className="text-slate-700">
              If you experience any of the following, seek urgent medical attention:
            </p>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Severe chest pain, difficulty breathing, or fainting.</li>
              <li>Sudden confusion, weakness, or difficulty speaking.</li>
              <li>High fever that does not improve or persistent severe symptoms.</li>
            </ul>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
              <strong>Emergency:</strong> Call your local emergency number immediately.
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Practical tips for illness at home</h4>
              <ol className="list-decimal pl-5 mt-2 text-slate-700 space-y-2">
                <li>Rest and stay hydrated.</li>
                <li>Monitor symptoms and temperature twice daily.</li>
                <li>Seek medical guidance if symptoms worsen or do not improve.</li>
              </ol>
            </div>
          </div>

          {/* Privacy summary card */}
          <aside id="privacy" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h4 className="text-lg font-semibold">Privacy: Quick summary</h4>
            <p className="mt-2 text-sm text-slate-600">
              This static page itself does not collect personal data. If integrated into a service
              that does collect data, standard safeguards are recommended.
            </p>

            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Limit access to authorized personnel.</li>
              <li>Use secure storage and retention policies.</li>
              <li>Obtain consent before sharing health data (unless required by law).</li>
            </ul>

            <div className="mt-4">
              <img
                src="https://images.unsplash.com/photo-1584467735872-8c7b6d6b9f98?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d5a7e8c9b1a2f0e6c4a2b1f5d6c7e8f"
                alt="Privacy and secure data"
                className="w-full h-36 object-cover rounded-md mt-3"
              />
            </div>
          </aside>
        </section>

        {/* Contact / footer-like CTA */}
        <section className="mt-12 bg-gradient-to-r from-slate-800 to-emerald-700 text-white p-6 rounded-xl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-lg font-semibold">Questions or concerns?</h5>
              <p className="text-sm opacity-90 mt-1">
                Contact the Public Health Office for more information or resources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="mailto:health@example.org"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm font-medium"
              >
                Email health@example.org
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm font-medium"
              >
                Call +1 (555) 123-4567
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
          <p>&copy; 2025 Public Health Office. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <a href="#privacy" className="underline">Privacy policy</a>
            <a href="#" className="underline">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
