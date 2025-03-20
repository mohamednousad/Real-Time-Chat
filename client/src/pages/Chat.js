import React, { useState } from "react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat

  return (
    <div>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 m-0 cursor-pointer border-blue-700 p-0 normal-case leading-5 hover:text-white transition-all"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block align-middle"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-blue-200 w-[440px] h-[634px]"
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center pb-6">
            <div>
              <h2 className="font-semibold text-lg tracking-tight text-blue-800">
                Chat
              </h2>
              <p className="text-sm text-blue-500 leading-3">
                Powered by VideoMeet
              </p>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 rounded-full hover:bg-blue-100 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="pr-4 h-[474px] overflow-y-auto">
            {/* AI Chat Message */}
            <div className="flex gap-3 my-4 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-blue-100 border border-blue-200 p-1">
                  <svg
                    stroke="none"
                    fill="blue"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846..."
                    />
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed">
                <span className="block font-bold text-blue-800">AI </span>Hi, how
                can I help you today?
              </p>
            </div>

            {/* User Chat Message */}
            <div className="flex gap-3 my-4 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-blue-100 border border-blue-200 p-1">
                  <svg
                    stroke="none"
                    fill="blue"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="20"
                    width="20"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6..." />
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed">
                <span className="block font-bold text-blue-800">You </span>Hello!
              </p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center pt-4">
            <form className="flex items-center justify-center w-full space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-blue-200 px-3 py-2 text-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message"
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 h-10 px-4 py-2 transition-all">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}