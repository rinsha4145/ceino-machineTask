import React, { useState } from "react";
import Sidebar from "./pages/Sidebar";
import FileUpload from "./pages/FileUpload";
import Users from "./pages/Users";

export default function App() {
  const [activeSection, setActiveSection] = useState("files");

 

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto lg:ml-0">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:ml-0 ml-12">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeSection === "files" ? "File Management" : "User Management"}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeSection === "files" 
                ? "Upload and manage your files" 
                : "Manage users and permissions"
              }
            </p>
          </div>

          {/* Content Area */}
          <div>
            {activeSection === "files" && <FileUpload />}
            {activeSection === "users" && <Users />}
          </div>
        </div>
      </main>
    </div>
  );
}

