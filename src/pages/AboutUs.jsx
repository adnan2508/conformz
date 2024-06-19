import React from 'react';

const AboutUs = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative bg-indigo-600">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            We are dedicated to providing the best service in the industry.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Company</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Who We Are
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We are a team of passionate individuals committed to delivering top-notch products and services.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-4 4h10" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Mission</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our mission is to bring high-quality products to our customers.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3-3m0 0l3 3m-3-3v10m4-10h4l3 3m0 0l-3 3m3-3v10" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Vision</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our vision is to innovate and lead the market with our top-notch products.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.38 0-2.74.35-4 .99-1.3.66-2.47 1.61-3.5 2.84a9.92 9.92 0 000 5.32c1.03 1.23 2.2 2.18 3.5 2.84 1.26.64 2.62.99 4 .99s2.74-.35 4-.99c1.3-.66 2.47-1.61 3.5-2.84a9.92 9.92 0 000-5.32c-1.03-1.23-2.2-2.18-3.5-2.84-1.26-.64-2.62-.99-4-.99z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l.01-.01" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Values</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We believe in integrity, innovation, and customer satisfaction.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Team
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our team is composed of talented and dedicated professionals.
            </p>
          </div>

          <div className="mt-10">
            <ul className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
              <li>
                <div className="space-y-4">
                  <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://i.ibb.co/bgz3yRp/user-2.jpg" alt="Team member" />
                  <div className="text-center space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>Jane Cooper</h3>
                      <p className="text-indigo-600">Team Lead</p>
                    </div>
                    <ul className="flex justify-center space-x-5">
                      <li>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.937 4.937 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.379 4.482A13.944 13.944 0 011.671 3.149a4.911 4.911 0 001.523 6.56 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.95 4.89a4.921 4.921 0 01-2.224.085 4.92 4.92 0 004.599 3.417A9.865 9.865 0 010 19.54a13.915 13.915 0 007.548 2.212c9.142 0 14.307-7.72 14.307-14.42 0-.22-.006-.438-.016-.653A10.24 10.24 0 0024 4.557z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19.99 3H4.01C3.44 3 3 3.44 3 4.01v15.98C3 20.56 3.44 21 4.01 21h15.98C20.56 21 21 20.56 21 19.99V4.01C21 3.44 20.56 3 19.99 3zM8.43 18.67H5.76v-8.93h2.67v8.93zM7.1 8.34c-.85 0-1.54-.69-1.54-1.54 0-.85.69-1.54 1.54-1.54.85 0 1.54.69 1.54 1.54 0 .85-.69 1.54-1.54 1.54zm11.57 10.33h-2.67v-4.44c0-1.06-.02-2.42-1.47-2.42-1.47 0-1.7 1.15-1.7 2.34v4.52h-2.67v-8.93h2.56v1.22h.04c.36-.69 1.24-1.42 2.55-1.42 2.73 0 3.24 1.8 3.24 4.14v5.02z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="space-y-4">
                  <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://i.ibb.co/WVmx36M/user-3.jpg" alt="Team member" />
                  <div className="text-center space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>John Doe</h3>
                      <p className="text-indigo-600">UI/UX Designer</p>
                    </div>
                    <ul className="flex justify-center space-x-5">
                      <li>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.937 4.937 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.379 4.482A13.944 13.944 0 011.671 3.149a4.911 4.911 0 001.523 6.56 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.95 4.89a4.921 4.921 0 01-2.224.085 4.92 4.92 0 004.599 3.417A9.865 9.865 0 010 19.54a13.915 13.915 0 007.548 2.212c9.142 0 14.307-7.72 14.307-14.42 0-.22-.006-.438-.016-.653A10.24 10.24 0 0024 4.557z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19.99 3H4.01C3.44 3 3 3.44 3 4.01v15.98C3 20.56 3.44 21 4.01 21h15.98C20.56 21 21 20.56 21 19.99V4.01C21 3.44 20.56 3 19.99 3zM8.43 18.67H5.76v-8.93h2.67v8.93zM7.1 8.34c-.85 0-1.54-.69-1.54-1.54 0-.85.69-1.54 1.54-1.54.85 0 1.54.69 1.54 1.54 0 .85-.69 1.54-1.54 1.54zm11.57 10.33h-2.67v-4.44c0-1.06-.02-2.42-1.47-2.42-1.47 0-1.7 1.15-1.7 2.34v4.52h-2.67v-8.93h2.56v1.22h.04c.36-.69 1.24-1.42 2.55-1.42 2.73 0 3.24 1.8 3.24 4.14v5.02z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="space-y-4">
                  <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://i.ibb.co/LzfJmYy/user-1.jpg" alt="Team member" />
                  <div className="text-center space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>Michel Enderson</h3>
                      <p className="text-indigo-600">Web Developer</p>
                    </div>
                    <ul className="flex justify-center space-x-5">
                      <li>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.937 4.937 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.379 4.482A13.944 13.944 0 011.671 3.149a4.911 4.911 0 001.523 6.56 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.95 4.89a4.921 4.921 0 01-2.224.085 4.92 4.92 0 004.599 3.417A9.865 9.865 0 010 19.54a13.915 13.915 0 007.548 2.212c9.142 0 14.307-7.72 14.307-14.42 0-.22-.006-.438-.016-.653A10.24 10.24 0 0024 4.557z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19.99 3H4.01C3.44 3 3 3.44 3 4.01v15.98C3 20.56 3.44 21 4.01 21h15.98C20.56 21 21 20.56 21 19.99V4.01C21 3.44 20.56 3 19.99 3zM8.43 18.67H5.76v-8.93h2.67v8.93zM7.1 8.34c-.85 0-1.54-.69-1.54-1.54 0-.85.69-1.54 1.54-1.54.85 0 1.54.69 1.54 1.54 0 .85-.69 1.54-1.54 1.54zm11.57 10.33h-2.67v-4.44c0-1.06-.02-2.42-1.47-2.42-1.47 0-1.7 1.15-1.7 2.34v4.52h-2.67v-8.93h2.56v1.22h.04c.36-.69 1.24-1.42 2.55-1.42 2.73 0 3.24 1.8 3.24 4.14v5.02z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {/* more team member adding placement */}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
