import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db";
import { AdminUser } from "../models/AdminUser";
import { Page } from "../models/Page";
import { Priority } from "../models/Priority";
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
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    { upsert: true },
  );

  const pages = [
    {
      slug: "home",
      title: "Home",
      seoDescription:
        "Vote A. Salam Shinwary for City Councillor — Ward 1, Oshawa.",
      sections: [
        {
          key: "hero",
          title: "Strong Leadership. Better Oshawa.",
          subtitle: "Listening. Leading. Delivering.",
          body: "City Councillor · Ward 1",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Our Priorities",
          buttonLink: "/vision",
          order: 1,
          items: [
            {
              key: "photo",
              title: "Candidate photo",
              image: "/images/candidate-hero.png",
            },
            {
              key: "signature",
              title: "Vote A. Salam Shinwary",
              body: "A Strong Voice for Ward 1",
            },
          ],
        },
        {
          key: "hero-meet",
          title: "Meet & Elect Shinwary",
          subtitle: "Candidate Profile",
          body: "Experience shaped by service. Leadership focused on Ward 1.",
          image: "/images/candidate-hero.png",
          buttonLabel: "Meet Shinwary",
          buttonLink: "/about",
          order: 2,
          items: [
            { title: "15+ Years of Service" },
            { title: "Environmental Management" },
            { title: "Community Leadership" },
          ],
        },
        {
          key: "hero-plan",
          title: "A Practical Plan for Ward 1",
          subtitle: "Priorities",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          buttonLabel: "View the Plan",
          buttonLink: "/vision",
          order: 3,
        },
        {
          key: "priorities",
          title: "A Practical Plan for Ward 1",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          order: 4,
        },
        {
          key: "meet",
          title: "Experience that serves.",
          subtitle: "Meet Shinwary",
          body: "Like many newcomers, Shinwary rebuilt his life in Canada from the beginning. That journey shaped a practical leader grounded in perseverance, responsibility and respect for community.",
          image: "/images/candidate-podium.jpg",
          order: 5,
          items: [
            {
              title: "Education",
              body: "Environmental Management and Paralegal education.",
            },
            {
              title: "Experience",
              body: "More than 15 years serving Canadian communities.",
            },
            {
              title: "Leadership",
              body: "Government, non-profit and private-sector project and budget experience.",
            },
            {
              title: "Why He Is Running",
              body: "Canada gave his family opportunity. Now he is ready to give back.",
            },
          ],
        },
        {
          key: "quote",
          title: "15+",
          subtitle: "Years",
          body: "Canada gave my family opportunity. Now it’s my turn to give back.",
          buttonLabel: "— A. Salam Shinwary",
          order: 6,
        },
        {
          key: "community",
          title: "Rooted in Community.",
          subtitle: "Ward 1 First",
          order: 7,
          items: [
            {
              title: "Community",
              body: "Proud to celebrate diversity and support our local traditions.",
              image: "/images/community-1.jpg",
            },
            {
              title: "Collaboration",
              body: "Working together to understand challenges and find solutions.",
              image: "/images/community-2.jpg",
            },
            {
              title: "Action",
              body: "Partnering with community groups to strengthen Ward 1.",
              image: "/images/community-3.jpg",
            },
          ],
        },
        {
          key: "advocacy",
          title: "Local priorities",
          order: 8,
          items: [
            { title: "Conlin Road improvements" },
            { title: "Student transportation concerns" },
            { title: "Safer routes for children" },
            { title: "Parks and green spaces" },
            { title: "Collaboration with schools and community partners" },
          ],
        },
        {
          key: "ward1",
          title: "Ward 1 is Home",
          body: "North Oshawa deserves visible representation, smart investment and a councillor who stays connected.",
          image: "/images/ward1-map.svg",
          order: 9,
          items: [
            {
              title: "Safe Streets",
              body: "Better roads, intersections, lighting and school routes.",
            },
            {
              title: "Green Spaces",
              body: "Protecting parks and creating welcoming community spaces.",
            },
            {
              title: "Strong Services",
              body: "Reliable neighbourhood services that improve everyday life.",
            },
          ],
        },
        {
          key: "commitment",
          title: "You should always know what your councillor is doing.",
          order: 10,
          items: [
            {
              title: "Visible & Accessible",
              body: "Easy to reach and active in the community.",
            },
            {
              title: "Regular Updates",
              body: "Clear monthly updates online and in neighbourhoods.",
            },
            {
              title: "Transparent & Accountable",
              body: "Honest decisions, open communication and measurable progress.",
            },
          ],
        },
        {
          key: "closing",
          title: "Let’s move Ward 1 forward.",
          subtitle: "Your voice. Your neighbourhood. Your future.",
          body: "Vote A. Salam Shinwary",
          buttonLabel: "Join the Campaign",
          buttonLink: "/contact",
          order: 11,
        },
      ],
    },
    {
      slug: "about",
      title: "About",
      seoDescription:
        "Meet A. Salam Shinwary — experience shaped by service for Ward 1.",
      sections: [
        {
          key: "hero",
          title: "Experience that Serves",
          subtitle: "Meet Shinwary",
          body: "A practical leader shaped by service, perseverance and respect for community in Ward 1.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Meet Shinwary",
          buttonLink: "/contact",
          order: 1,
        },
        {
          key: "meet",
          title: "Experience that serves.",
          subtitle: "Meet Shinwary",
          body: "Like many newcomers, Shinwary rebuilt his life in Canada from the beginning. That journey shaped a practical leader grounded in perseverance, responsibility and respect for community.",
          image: "/images/candidate-podium.jpg",
          order: 2,
          items: [
            {
              title: "Education",
              body: "Environmental Management and Paralegal education.",
            },
            {
              title: "Experience",
              body: "More than 15 years serving Canadian communities.",
            },
            {
              title: "Leadership",
              body: "Government, non-profit and private-sector project and budget experience.",
            },
            {
              title: "Why He Is Running",
              body: "Canada gave his family opportunity. Now he is ready to give back.",
            },
          ],
        },
        {
          key: "quote",
          title: "15+",
          subtitle: "Years",
          body: "Canada gave my family opportunity. Now it’s my turn to give back.",
          buttonLabel: "— A. Salam Shinwary",
          order: 3,
        },
        {
          key: "commitment",
          title: "You should always know what your councillor is doing.",
          order: 4,
          items: [
            {
              title: "Visible & Accessible",
              body: "Easy to reach and active in the community.",
            },
            {
              title: "Regular Updates",
              body: "Clear monthly updates online and in neighbourhoods.",
            },
            {
              title: "Transparent & Accountable",
              body: "Honest decisions, open communication and measurable progress.",
            },
          ],
        },
      ],
    },
    {
      slug: "vision",
      title: "Vision",
      seoDescription:
        "A practical plan for Ward 1 — safer streets, responsible spending, stronger services.",
      sections: [
        {
          key: "hero",
          title: "A Practical Plan for Ward 1",
          subtitle: "Vision",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Join the Campaign",
          buttonLink: "/contact",
          order: 1,
        },
        {
          key: "priorities",
          title: "A Practical Plan for Ward 1",
          body: "Safer streets. Responsible spending. Stronger neighbourhood services.",
          order: 2,
        },
        {
          key: "commitment",
          title: "You should always know what your councillor is doing.",
          order: 3,
          items: [
            {
              title: "Visible & Accessible",
              body: "Easy to reach and active in the community.",
            },
            {
              title: "Regular Updates",
              body: "Clear monthly updates online and in neighbourhoods.",
            },
            {
              title: "Transparent & Accountable",
              body: "Honest decisions, open communication and measurable progress.",
            },
          ],
        },
      ],
    },
    {
      slug: "ward-1",
      title: "Ward 1",
      seoDescription:
        "Ward 1 is home — visible representation for North Oshawa.",
      sections: [
        {
          key: "hero",
          title: "Ward 1 is Home",
          subtitle: "Ward 1 · Oshawa",
          body: "North Oshawa deserves visible representation, smart investment and a councillor who stays connected.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Get Involved",
          buttonLink: "/contact",
          order: 1,
        },
        {
          key: "ward1",
          title: "Ward 1 is Home",
          body: "North Oshawa deserves visible representation, smart investment and a councillor who stays connected.",
          image: "/images/ward1-map.svg",
          order: 2,
          items: [
            {
              title: "Safe Streets",
              body: "Better roads, intersections, lighting and school routes.",
            },
            {
              title: "Green Spaces",
              body: "Protecting parks and creating welcoming community spaces.",
            },
            {
              title: "Strong Services",
              body: "Reliable neighbourhood services that improve everyday life.",
            },
          ],
        },
        {
          key: "commitment",
          title: "You should always know what your councillor is doing.",
          order: 3,
          items: [
            {
              title: "Visible & Accessible",
              body: "Easy to reach and active in the community.",
            },
            {
              title: "Regular Updates",
              body: "Clear monthly updates online and in neighbourhoods.",
            },
            {
              title: "Transparent & Accountable",
              body: "Honest decisions, open communication and measurable progress.",
            },
          ],
        },
      ],
    },
    {
      slug: "community",
      title: "Community",
      seoDescription:
        "Rooted in community — showing up and working together for Ward 1.",
      sections: [
        {
          key: "hero",
          title: "Rooted in Community",
          subtitle: "Community",
          body: "Showing up. Listening. Working together for Ward 1.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Get Involved",
          buttonLink: "/contact",
          order: 1,
        },
        {
          key: "community",
          title: "Rooted in Community.",
          subtitle: "Ward 1 First",
          order: 2,
          items: [
            {
              title: "Community",
              body: "Proud to celebrate diversity and support our local traditions.",
              image: "/images/community-1.jpg",
            },
            {
              title: "Collaboration",
              body: "Working together to understand challenges and find solutions.",
              image: "/images/community-2.jpg",
            },
            {
              title: "Action",
              body: "Partnering with community groups to strengthen Ward 1.",
              image: "/images/community-3.jpg",
            },
          ],
        },
        {
          key: "advocacy",
          title: "Local priorities",
          order: 3,
          items: [
            { title: "Conlin Road improvements" },
            { title: "Student transportation concerns" },
            { title: "Safer routes for children" },
            { title: "Parks and green spaces" },
            { title: "Collaboration with schools and community partners" },
          ],
        },
      ],
    },
    {
      slug: "contact",
      title: "Contact",
      seoDescription: "Contact Vote Shinwary — join the Ward 1 campaign.",
      sections: [
        {
          key: "hero",
          title: "Let’s Move Ward 1 Forward",
          subtitle: "Contact",
          body: "Your voice. Your neighbourhood. Your future. Reach out and join the campaign.",
          image: "/images/hero-bg.jpg",
          buttonLabel: "Email Shinwary",
          buttonLink: "mailto:salam.jan111@gmail.com",
          order: 1,
        },
        {
          key: "details",
          title: "Campaign Contact",
          body: "Questions about Ward 1 priorities, volunteering, or the campaign? Get in touch directly.",
          order: 2,
        },
        {
          key: "involve",
          title: "Get Involved",
          body: "Help move Ward 1 forward — share the campaign, talk with neighbours, and stay connected for updates.",
          buttonLabel: "Join the Campaign",
          buttonLink: "mailto:salam.jan111@gmail.com",
          order: 3,
        },
        {
          key: "closing",
          title: "Let’s move Ward 1 forward.",
          subtitle: "Your voice. Your neighbourhood. Your future.",
          body: "Vote A. Salam Shinwary",
          buttonLabel: "Join the Campaign",
          buttonLink: "/contact",
          order: 4,
        },
      ],
    },
  ];

  for (const page of pages) {
    await Page.findOneAndUpdate({ slug: page.slug }, page, {
      upsert: true,
      overwrite: true,
    });
  }

  const priorities = [
    {
      slug: "responsible-spending",
      title: "Responsible Spending",
      shortDescription: "Every tax dollar should deliver real value.",
      cardImage: "/images/community-1.jpg",
      icon: "dollar",
      order: 1,
      published: true,
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
      published: true,
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
      published: true,
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
      published: true,
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
    await Priority.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
    });
  }

  await Page.deleteMany({ slug: { $in: ["gallery", "testimonials", "faqs"] } });

  console.log("Seed complete — admin content matches the live site.");
  console.log(`Admin login: ${email} / ${password}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
