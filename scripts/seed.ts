import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db";
import { AdminUser } from "../models/AdminUser";
import { Page } from "../models/Page";
import { Priority } from "../models/Priority";
import { GalleryCategory } from "../models/GalleryCategory";
import { Testimonial } from "../models/Testimonial";
import { Faq } from "../models/Faq";
import { Settings } from "../models/Settings";

async function seed() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@shinwary.ca";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await AdminUser.findOneAndUpdate(
    { email },
    { email, passwordHash, name: "Campaign Admin" },
    { upsert: true },
  );

  await Settings.findOneAndUpdate(
    { key: "site" },
    {
      key: "site",
      email: "salam.jan111@gmail.com",
      phone: "416 419 2457",
      address: "Ward 1, Oshawa, Ontario",
      logo: "/images/logo.png",
      siteName: "Vote Shinwary",
      tagline:
        "Strong leadership. Better Oshawa. A practical voice for Ward 1.",
    },
    { upsert: true },
  );

  const pages = [
    {
      slug: "home",
      title: "Home",
      sections: [
        {
          key: "hero",
          title: "STRONG LEADERSHIP. BETTER OSHAWA.",
          subtitle: "Listening. Leading. Delivering.",
          body: "CITY COUNCILLOR · WARD 1",
          image: "/images/candidate-hero.png",
          buttonLabel: "Our Priorities",
          buttonLink: "/vision",
          order: 1,
        },
        {
          key: "priorities",
          title: "A Practical Plan for Ward 1",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          image: "/images/hero-bg.jpg",
          order: 2,
        },
        {
          key: "community",
          title: "Rooted in Community",
          body: "Showing up. Listening. Working together.",
          image: "/images/community-1.jpg",
          order: 3,
        },
        {
          key: "closing",
          title: "Let's move Ward 1 forward.",
          subtitle: "Your voice. Your neighbourhood. Your future.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Join the Campaign",
          buttonLink: "/contact",
          order: 4,
        },
      ],
    },
    {
      slug: "about",
      title: "About",
      sections: [
        {
          key: "hero",
          title: "Experience that Serves",
          subtitle: "Meet Shinwary",
          body: "A practical leader shaped by service, perseverance and respect for community in Ward 1.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
        {
          key: "story",
          title: "Experience that serves.",
          body: "Like many newcomers, Shinwary rebuilt his life in Canada from the beginning. That journey shaped a practical leader grounded in perseverance, responsibility and respect for community.",
          image: "/images/candidate-podium.jpg",
          order: 2,
        },
        {
          key: "quote",
          title: "Featured quote",
          body: "Canada gave my family opportunity. Now it's my turn to give back.",
          image: "",
          order: 3,
        },
      ],
    },
    {
      slug: "vision",
      title: "Vision",
      sections: [
        {
          key: "hero",
          title: "A Practical Plan for Ward 1",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "ward-1",
      title: "Ward 1",
      sections: [
        {
          key: "hero",
          title: "Ward 1 is Home",
          body: "North Oshawa deserves visible representation, smart investment and a councillor who stays connected.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
        {
          key: "map",
          title: "North Oshawa — Ward 1",
          body: "Safe streets, green spaces and strong services.",
          image: "/images/ward1-map.svg",
          order: 2,
        },
      ],
    },
    {
      slug: "community",
      title: "Community",
      sections: [
        {
          key: "hero",
          title: "Rooted in Community",
          body: "Showing up. Listening. Working together for Ward 1.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "gallery",
      title: "Gallery",
      sections: [
        {
          key: "hero",
          title: "Campaign Gallery",
          body: "Moments from Ward 1 — community, collaboration and action.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "testimonials",
      title: "Testimonials",
      sections: [
        {
          key: "hero",
          title: "Voices from Ward 1",
          body: "Neighbours sharing why visible, practical leadership matters.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "faqs",
      title: "FAQs",
      sections: [
        {
          key: "hero",
          title: "Frequently Asked Questions",
          body: "Clear answers about the campaign, priorities and how to get involved.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "contact",
      title: "Contact",
      sections: [
        {
          key: "hero",
          title: "Let's Move Ward 1 Forward",
          body: "Your voice. Your neighbourhood. Your future. Reach out and join the campaign.",
          image: "/images/hero-bg.jpg",
          order: 1,
        },
      ],
    },
  ];

  for (const page of pages) {
    await Page.findOneAndUpdate({ slug: page.slug }, page, { upsert: true });
  }

  const priorities = [
    {
      slug: "responsible-spending",
      title: "Responsible Spending",
      shortDescription: "Every tax dollar should deliver real value.",
      cardImage: "/images/community-1.jpg",
      icon: "dollar",
      order: 1,
      detailSections: [
        {
          key: "overview",
          title: "Responsible Spending",
          body: "Transparent budgets and practical decisions that put residents first.",
          image: "/images/community-1.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "safer-roads",
      title: "Safer Roads",
      shortDescription:
        "Better roads, safer intersections and smarter traffic solutions.",
      cardImage: "/images/community-2.jpg",
      icon: "shield",
      order: 2,
      detailSections: [
        {
          key: "overview",
          title: "Safer Roads",
          body: "Improving roads, intersections, lighting and school routes across Ward 1.",
          image: "/images/community-2.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "fair-property-taxes",
      title: "Fair Property Taxes",
      shortDescription: "Transparent budgets and responsible decisions.",
      cardImage: "/images/community-3.jpg",
      icon: "home",
      order: 3,
      detailSections: [
        {
          key: "overview",
          title: "Fair Property Taxes",
          body: "Clear communication and accountable choices on local taxation.",
          image: "/images/community-3.jpg",
          order: 1,
        },
      ],
    },
    {
      slug: "responsive-service",
      title: "Responsive Service",
      shortDescription: "A councillor who listens, acts and reports back.",
      cardImage: "/images/candidate-podium.jpg",
      icon: "people",
      order: 4,
      detailSections: [
        {
          key: "overview",
          title: "Responsive Service",
          body: "Visible representation with regular updates and open communication.",
          image: "/images/candidate-podium.jpg",
          order: 1,
        },
      ],
    },
  ];

  for (const item of priorities) {
    await Priority.findOneAndUpdate({ slug: item.slug }, item, { upsert: true });
  }

  await GalleryCategory.findOneAndUpdate(
    { slug: "community" },
    {
      name: "Community",
      slug: "community",
      description: "Celebrating diversity and local traditions.",
      images: [
        {
          url: "/images/community-1.jpg",
          alt: "Community event",
          caption: "Community",
          order: 1,
        },
      ],
    },
    { upsert: true },
  );
  await GalleryCategory.findOneAndUpdate(
    { slug: "collaboration" },
    {
      name: "Collaboration",
      slug: "collaboration",
      description: "Working together on local challenges.",
      images: [
        {
          url: "/images/community-2.jpg",
          alt: "Collaboration meeting",
          caption: "Collaboration",
          order: 1,
        },
      ],
    },
    { upsert: true },
  );
  await GalleryCategory.findOneAndUpdate(
    { slug: "action" },
    {
      name: "Action",
      slug: "action",
      description: "Partnering with community groups.",
      images: [
        {
          url: "/images/community-3.jpg",
          alt: "Community action",
          caption: "Action",
          order: 1,
        },
      ],
    },
    { upsert: true },
  );

  const testimonials = [
    {
      name: "Ward 1 Resident",
      role: "North Oshawa",
      quote:
        "We need a councillor who shows up, listens, and follows through for our neighbourhoods.",
      image: "",
      order: 1,
    },
    {
      name: "Community Partner",
      role: "Local Organization",
      quote:
        "Practical leadership and clear communication make a real difference in Ward 1.",
      image: "",
      order: 2,
    },
  ];
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);

  const faqs = [
    {
      question: "Who is A. Salam Shinwary?",
      answer:
        "A. Salam Shinwary is a candidate for City Councillor in Ward 1, Oshawa, with more than 15 years serving Canadian communities.",
      order: 1,
    },
    {
      question: "What are the main priorities?",
      answer:
        "Responsible spending, safer roads, fair property taxes, and responsive service for Ward 1 residents.",
      order: 2,
    },
    {
      question: "How can I get involved?",
      answer:
        "Email salam.jan111@gmail.com or call 416 419 2457 to join the campaign.",
      order: 3,
    },
  ];
  await Faq.deleteMany({});
  await Faq.insertMany(faqs);

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
