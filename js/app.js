/* ============================================
   APP — Main Entry Point
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[App] Initializing with dynamic data...');

  // 1. Fetch data from Backend
  // We fetch CV data and Blog posts in parallel
  const [cvData, blogPosts] = await Promise.all([
    API.getCV(),
    API.getPosts()
  ]);

  const useFallback = !cvData;
  if (useFallback) {
    console.warn('[App] WARNING: API failed. Using static emergency fallback from data.js');
  }

  // 2. Prepare Data Object (Strictly prefer Backend data, DATA is emergency fallback)
  const appData = {
    personal: cvData?.profile ?? DATA.personal,
    about: DATA.about, // Kept static as it's not in the DB architecture
    experience: cvData?.experiences ?? DATA.experience,
    projects: cvData?.projects ?? DATA.projects,
    skills: cvData?.skills ?? DATA.skills,
    posts: blogPosts ?? [],
    education: cvData?.education ?? DATA.education,
    certifications: cvData?.certifications ?? DATA.certifications
  };

  // 3. Bind Dynamic Links
  const playgroundLink = document.getElementById('playground-link');
  if (playgroundLink) {
    playgroundLink.href = CONFIG.PLAYGROUND_URL;
  }

  // 4. Initialize Modules
  Theme.init();
  Navigation.init();
  
  // Initialize i18n before UI modules
  I18n.init(appData);
  
  Hero.init(appData);
  About.init(appData);
  Timeline.init(appData);
  Projects.init(appData);
  Skills.init(appData);
  Education.init(appData);
  Certifications.init(appData);
  Blog.init(appData);
  Contact.init(appData);
  Footer.init(appData);
  Animations.init();

  console.log('[App] Successfully initialized with Backend data and Multi-language support');
});
