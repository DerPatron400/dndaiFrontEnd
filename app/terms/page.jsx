"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Terms() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-screen h-full flex justify-center items-center bg-black">
      <div className="md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans">
        <div data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-6 flex justify-center items-center text-center">
            <span className="text-white">
              Terms and <span className="text-green-500">Conditions</span>
            </span>
          </h2>

          <section>
            <h3 className="text-xl mb-2 font-medium">Terms of Service</h3>
            <p>
              By using this website, you agree to abide by our Terms of Service.
              These terms govern your use of our platform and outline your
              responsibilities as a user.
            </p>
          </section>

          <hr className="border-t border-green-500 my-6" />

          <section>
            <h3 className="text-xl mb-2 font-medium">Privacy Policy</h3>
            <p>
              Our Privacy Policy explains how we collect, use, and protect your
              personal information when you use our services. We are committed
              to safeguarding your privacy.
            </p>
          </section>

          <hr className="border-t border-green-500 my-6" />

          <section>
            <h3 className="text-xl mb-2 font-medium">Disclaimer</h3>
            <p>
              This website and its content are provided 'as is' without any
              representations or warranties, express or implied. We do not
              guarantee the accuracy, completeness, or reliability of any
              information on this website.
            </p>
          </section>

          <hr className="border-t border-green-500 my-6" />

          <section>
            <h3 className="text-xl mb-2 font-medium">
              Limitation of Liability
            </h3>
            <ul className="list-disc ml-6">
              <li>
                In no event shall we be liable for any special, direct,
                indirect, incidental, consequential damages or any damages
                whatsoever.
              </li>
              <li>
                Whether in an action of contract, negligence or other tort,
                arising out of or in connection with the use of the Service or
                the contents of the Service.
              </li>
            </ul>
          </section>

          <hr className="border-t border-green-500 my-6" />

          <section>
            <h3 className="text-xl mb-2 font-medium">Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of the United States without regard to its conflict of law
              provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
