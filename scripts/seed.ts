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
      email: "Vote4shinwary@gmail.com",
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
          title: "Elect Shinwary",
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
          body: "Shinwary rebuilt his life in Canada through hard work and education. That journey shaped a practical leader.",
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
          key: "story",
          title: "From newcomer to neighbour.",
          subtitle: "His Story",
          body: "Shinwary rebuilt his life in Canada with hard work, education and a deep belief that public service should be practical — not political theatre.\n\nRaised with respect for community and responsibility, he chose Oshawa as home. Ward 1 is where his family lives, where neighbours become friends, and where decisions at city hall should reflect everyday life.",
          image: "/images/candidate-podium.jpg",
          order: 2,
        },
        {
          key: "timeline",
          title: "A Track Record of Service",
          subtitle: "",
          body: "",
          order: 3,
          items: [
            {
              title: "2010",
              body: "Began working with local government agencies on community development projects.",
            },
            {
              title: "2015",
              body: "Led multiple infrastructure and budget transparency initiatives in Oshawa.",
            },
            {
              title: "2019",
              body: "Recognized for outstanding community service and resident advocacy in Ward 1.",
            },
            {
              title: "2023",
              body: "Launched grassroots campaign to bring real change to Ward 1 residents.",
            },
            {
              title: "2026",
              body: "Running for Ward 1 Councillor. Election Day is October 26, 2026.",
            },
          ],
        },
        {
          key: "values",
          title: "Principles for Ward 1.",
          subtitle: "What guides him",
          body: "How Shinwary will show up as your councillor — every day, not just at election time.",
          order: 4,
          items: [
            {
              title: "Service First",
              body: "Politics should solve problems — not create them. Ward 1 deserves results.",
            },
            {
              title: "Accountability",
              body: "Open books, honest communication and decisions you can see in your neighbourhood.",
            },
            {
              title: "Monthly Updates",
              body: "Clear reports online and in the community so you always know what's happening.",
            },
            {
              title: "Practical Leadership",
              body: "Experience managing budgets, projects and teams — skills that translate to council.",
            },
          ],
        },
        {
          key: "quote",
          title: "15+",
          subtitle: "Years of service",
          body: "Canada gave my family opportunity. Now it's my turn to give back — with the same perseverance that brought us here.",
          buttonLabel: "— A. Salam Shinwary",
          order: 5,
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
          key: "intro",
          title: "Leadership that listens first.",
          subtitle: "Our approach",
          body: "Ward 1 doesn't need more promises — it needs a councillor who understands budgets, delivers projects and stays accountable between elections.\n\nShinwary's plan is built on four practical priorities backed by 15+ years of project and budget experience. Every proposal is measured against one question: does this improve everyday life in North Oshawa?",
          order: 2,
        },
        {
          key: "approach",
          title: "Listen. Plan. Deliver.",
          subtitle: "How we'll work",
          body: "A simple process — because good governance shouldn't be complicated for residents.",
          order: 3,
          items: [
            {
              title: "Listen",
              body: "Door knocks, community meetings and direct outreach — priorities start with residents, not consultants.",
            },
            {
              title: "Plan",
              body: "Translate concerns into actionable motions with timelines, costs and measurable outcomes.",
            },
            {
              title: "Deliver",
              body: "Follow through publicly. Report wins and setbacks honestly so neighbours stay informed.",
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
          key: "intro",
          title: "Ward 1 is built on neighbours.",
          subtitle: "Why it matters",
          body: "Strong communities aren't built at city hall — they're built at school gates, block parties and kitchen-table conversations.\n\nShinwary has spent years showing up: listening to parents on student transportation, advocating for Conlin Road fixes and partnering with local groups. As councillor, that same presence becomes your voice in every council meeting.",
          order: 2,
        },
        {
          key: "gallery",
          title: "Moments that matter.",
          subtitle: "In the community",
          order: 3,
          items: [
            {
              title: "Celebrating together",
              subtitle: "Events",
              body: "Supporting local traditions and the diversity that makes North Oshawa strong.",
              image: "/images/community-1.jpg",
            },
            {
              title: "Working with partners",
              subtitle: "Collaboration",
              body: "Meeting with residents, schools and community leaders to understand real challenges.",
              image: "/images/community-2.jpg",
            },
            {
              title: "Taking action",
              subtitle: "Advocacy",
              body: "Turning conversations into advocacy — from road safety to parks and green space.",
              image: "/images/community-3.jpg",
            },
          ],
        },
        {
          key: "advocacy",
          title: "Issues we're fighting for.",
          body: "These aren't abstract policy goals — they're conversations Shinwary has already started with Ward 1 residents.",
          order: 4,
          items: [
            {
              title: "Conlin Road improvements",
              body: "Pushing for safer, smoother commutes on one of Ward 1's busiest corridors.",
            },
            {
              title: "Student transportation",
              body: "Working with families and schools on bus routes, safety and reliable service.",
            },
            {
              title: "Safer routes for children",
              body: "Better crossings, lighting and traffic calming near schools and parks.",
            },
            {
              title: "Parks & green spaces",
              body: "Protecting and improving the places where neighbours gather and kids play.",
            },
            {
              title: "School partnerships",
              body: "Connecting council decisions with what families and educators see every day.",
            },
            {
              title: "Neighbourhood listening",
              body: "Regular ward meetings so priorities come from residents — not top-down plans.",
            },
          ],
        },
        {
          key: "involve",
          title: "Be part of the movement.",
          subtitle: "Your turn",
          body: "Campaigns are built one conversation at a time. Here's how you can help.",
          order: 5,
          items: [
            {
              title: "Volunteer",
              body: "Help with events, door knocking or community outreach in your area.",
            },
            {
              title: "Share your story",
              body: "Tell us what matters on your street — we're building the ward plan together.",
            },
            {
              title: "Stay connected",
              body: "Follow updates and invite neighbours to join the conversation for Ward 1.",
            },
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
          buttonLink: "mailto:Vote4shinwary@gmail.com",
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
          buttonLink: "mailto:Vote4shinwary@gmail.com",
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
