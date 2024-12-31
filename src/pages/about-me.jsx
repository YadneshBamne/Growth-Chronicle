import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "/pfp.jpg";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const AboutMe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-lg w-full shadow-lg rounded-lg overflow-hidden">
        {/* Banner Section */}
        <div
          className="relative h-32 bg-cover bg-center"
          style={{ backgroundImage: `url('https://picsum.photos/600/200')` }}
        >
          {/* Avatar */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={logo}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-2xl"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 text-center px-6">
          <h1 className="text-2xl font-bold text-white-800">Atharva Shelke</h1>
          <p className="text-sm text-white-500">
            Marketing Enthusiast & Engineering Student
          </p>
          <p className="mt-4 text-white-700">
            Hi, I’m Atharva Shelke, a passionate marketing enthusiast with a
            knack for understanding what makes businesses thrive. Currently
            pursuing my engineering degree, I’m also diving deep into the world
            of marketing to bridge creativity with data-driven strategies. I
            believe marketing is the perfect blend of storytelling and
            analytics, and I’m here to explore and share insights that help
            brands connect with their audiences.
          </p>
          <p className="mt-4 text-white-700">
            Through this blog, I aim to share my thoughts, experiences, and
            practical tips on marketing. Let’s embark on this journey together
            and uncover what makes a brand stand out in today’s competitive
            world.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 py-4">
          <a
            href="https://www.instagram.com/_atharvashelke_/profilecard/?igsh=OHdieGZzcTY2eTc="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-600 transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://x.com/_atharva_shelke?t=PIf6QhCRcMf_82Fs5f29Sg&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/atharva-shelke-a9a9a9226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <Linkedin size={24} />
          </a>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center px-6 py-4">
          <Button variant="destructive" className="w-full mr-2">
            View Portfolio
          </Button>
          <Button variant="blue" className="w-full ml-2">
            Contact Me
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AboutMe;
