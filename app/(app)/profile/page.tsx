import React from "react";
import ProfileSideBar from "./components/profile-sidebar";
import SectionSeparator from "@/components/custom/section-seprator";
import ProfileForm from "./components/profile-form";

const ProfilePage = () => {
  return (
    <article className="container mx-auto px-4">
      <div className="mt-2">
        <SectionSeparator sectionTitle="User Profile" />
      </div>

      {/* Responsive layout: column on small screens, row on medium+ */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-16 mt-6">
        <ProfileSideBar />
        <div className="flex-1">
          <ProfileForm />
        </div>
      </section>
    </article>
  );
};

export default ProfilePage;
