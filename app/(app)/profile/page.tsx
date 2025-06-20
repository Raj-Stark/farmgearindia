"use client";

import React, { Suspense } from "react";

import SectionSeparator from "@/components/custom/section-seprator";
import ProfileTabs from "./components/profile-tabs";

const ProfilePage = () => {
  return (
    <article className="container mx-auto px-4 min-h-screen">
      <div className="mt-2">
        <SectionSeparator sectionTitle="User Profile" />
      </div>

      <section className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileTabs />
        </Suspense>
      </section>
    </article>
  );
};

export default ProfilePage;
