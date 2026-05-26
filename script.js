 // ========== MODAL ==========
  function showModal(title, message) {
    const modal = document.getElementById('actionModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    modal.classList.add('show');
  }
  window.closeModal = function() {
    document.getElementById('actionModal').classList.remove('show');
  }

  // ========== PAGE NAVIGATION ==========
  function showPage(pageId) {
    // Hide all pages
    const allPages = ['page-summary', 'page-education', 'page-experience', 'page-projects', 'page-skills', 'page-ebooks', 'page-research', 'page-quotes', 'page-contact'];
    allPages.forEach(id => {
      const el = document.getElementById(id);
      if(el) el.classList.remove('active-page');
    });
    
    // Show selected page
    const target = document.getElementById(pageId);
    if(target) target.classList.add('active-page');
    
    // Update active states for header nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('data-page') === pageId.replace('page-', '')) {
        link.classList.add('active');
      }
    });
    
    // Update active states for sidebar links
    document.querySelectorAll('.side-link').forEach(link => {
      link.classList.remove('active-section');
      if(link.getAttribute('data-page') === pageId.replace('page-', '')) {
        link.classList.add('active-section');
      }
    });
    
    // Refresh charts if skills page
    if(pageId === 'page-skills') {
      setTimeout(() => {
        if(window.barChart) window.barChart.update();
        if(window.pieChart) window.pieChart.update();
      }, 100);
    }
  }

  // Header navigation clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = link.getAttribute('data-page');
      if(pageName === 'summary') showPage('page-summary');
      else if(pageName === 'education') showPage('page-education');
      else if(pageName === 'experience') showPage('page-experience');
      else if(pageName === 'projects') showPage('page-projects');
      else if(pageName === 'skills') showPage('page-skills');
      else if(pageName === 'ebooks') showPage('page-ebooks');
      else if(pageName === 'research') showPage('page-research');
      else if(pageName === 'contact') showPage('page-contact');
    });
  });

  // Sidebar navigation clicks
  document.querySelectorAll('.side-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = link.getAttribute('data-page');
      if(pageName === 'summary') showPage('page-summary');
      else if(pageName === 'education') showPage('page-education');
      else if(pageName === 'experience') showPage('page-experience');
      else if(pageName === 'projects') showPage('page-projects');
      else if(pageName === 'skills') showPage('page-skills');
      else if(pageName === 'ebooks') showPage('page-ebooks');
      else if(pageName === 'research') showPage('page-research');
      else if(pageName === 'quotes') showPage('page-quotes');
      else if(pageName === 'contact') showPage('page-contact');
    });
  });

  // ========== QUOTES ==========
  const quotesList = [
    "“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt",
    "“Don't watch the clock; do what it does. Keep going.” – Sam Levenson",
    "“Success is not final, failure is not fatal: it is the courage to continue that counts.” – Winston Churchill",
    "“Believe you can and you're halfway there.” – Theodore Roosevelt",
    "“It does not matter how slowly you go as long as you do not stop.” – Confucius",
    "“Your time is limited, don't waste it living someone else's life.” – Steve Jobs"
  ];
  let currentQuoteIndex = 2;
  
  function updateSummaryQuote() {
    const summaryQuote = document.getElementById('dynamicQuote');
    if(summaryQuote) summaryQuote.innerText = quotesList[currentQuoteIndex % quotesList.length];
  }
  
  function updateQuotesPage() {
    const quotesPageText = document.getElementById('quotePageText');
    if(quotesPageText) quotesPageText.innerText = quotesList[currentQuoteIndex % quotesList.length];
  }
  
  function nextQuote() {
    currentQuoteIndex++;
    updateSummaryQuote();
    updateQuotesPage();
  }
  
  document.getElementById('nextQuoteBtn')?.addEventListener('click', nextQuote);
  document.getElementById('refreshQuoteBtn')?.addEventListener('click', nextQuote);
  
  updateSummaryQuote();
  updateQuotesPage();

  // ========== CHARTS ==========
  let barChart, pieChart;
  function initCharts() {
    const barCtx = document.getElementById('barChart')?.getContext('2d');
    const pieCtx = document.getElementById('pieChart')?.getContext('2d');
    
    if(barCtx) {
      barChart = new Chart(barCtx, {
        type: 'bar',
        data: { 
          labels: ['Python', 'JavaScript', 'C++', 'Data Science', 'ML', 'HTML/CSS', 'PHP', 'GenAI'], 
          datasets: [{ 
            label: 'Proficiency (0-10)', 
            data: [9.2, 7.7, 8.2, 9.0, 8.7, 8.0, 6.8, 8.1], 
            backgroundColor: '#4f46e5', 
            borderRadius: 8 
          }] 
        },
        options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: 10 } } }
      });
    }
    
    if(pieCtx) {
      pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: { 
          labels: ['Python', 'JavaScript', 'C++', 'Data Science', 'ML', 'HTML/CSS', 'PHP', 'GenAI'], 
          datasets: [{ 
            data: [9.2, 7.7, 8.2, 9.0, 8.7, 8.0, 6.8, 8.1], 
            backgroundColor: ['#4f46e5', '#6366f1', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f0abfc', '#f5d0fe'] 
          }] 
        },
        options: { responsive: true }
      });
    }
  }
  initCharts();

  // ========== THEME CHANGER ==========
  const themes = ['orange', 'purple', 'bluepowder', 'silver', 'darkgray', 'royal'];
  function setTheme(theme) {
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('portfolioTheme', theme);
    showModal('🎨 Theme Changed', `Theme switched to ${theme.toUpperCase()} mode!`);
    // Update chart colors
    if(barChart) {
      const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim();
      barChart.data.datasets[0].backgroundColor = accent || '#4f46e5';
      barChart.update();
      pieChart.update();
    }
  }
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  
  const savedTheme = localStorage.getItem('portfolioTheme');
  if(savedTheme && themes.includes(savedTheme)) setTheme(savedTheme);
  else setTheme('bluepowder');

  // ========== RESUME DOWNLOAD ==========
  // document.getElementById('resumeBtn')?.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   const resumeContent = "Arik Mukherjee - Data Science Resume\n\nEducation:\n- BSc Computer Science: CGPA 9.56\n- MSc Computer Science (Pursuing)\n\nSkills:\nPython, Machine Learning, Data Science, GenAI, C++, JavaScript\n\nExperience:\n- Anwesha Academy: Data Analytics & GenAI Intern\n- ISI Kolkata: Data Science Intern\n\nProjects:\n- Diabetes Prediction Model\n- Eudify E-Learning Website\n- Heart Disease Analysis";
  //   const blob = new Blob([resumeContent], {type: 'application/pdf'});
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'Arik_Mukherjee_Resume.pdf';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  //   showModal('✅ Resume Download', 'Your resume has been downloaded successfully!');
  // });

  // ========== RESUME DOWNLOAD ==========
document.getElementById('resumeBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Replace 'Arik_Mukherjee_CV.pdf' with your actual file name
  const cvPath = 'Arik_Mukherjee_CV.pdf';
  
  // Create a temporary link to download the file
  const a = document.createElement('a');
  a.href = cvPath;
  a.download = 'Arik_Mukherjee_Resume.pdf'; // This is what the downloaded file will be named
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  showModal('✅ Resume Download', 'Your resume download has started!');
});

  // ========== CERTIFICATE BUTTONS ==========
  document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cert = btn.getAttribute('data-cert');
      if(cert === 'anwesha') showModal('📜 Certificate', 'Anwesha Academy - Data Analytics & GenAI Internship (2025) - Certificate of Completion');
      else showModal('🏅 Certificate', 'ISI Kolkata - Data Science Summer Internship 2026 - Certificate of Excellence');
    });
  });

  // ========== PROJECT BUTTONS ==========
  document.querySelectorAll('.project-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('🔗 Project Link', 'GitHub repository link (demo). Full source code available upon request.');
    });
  });
  
  document.querySelectorAll('.project-report').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('📄 Project Report', 'Detailed project documentation with methodology, results, and future scope (PDF demo).');
    });
  });

  // ========== E-BOOK BUTTON ==========
  document.getElementById('ebookBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showModal('📘 E-Book', 'Intent-Driven Development - Sample chapters preview. Full ebook available soon.');
  });

  // ========== RESEARCH BUTTONS ==========
  // document.getElementById('researchBtn1')?.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   showModal('📑 Research Preprint', 'Ensemble Learning for Early Diabetes Detection - Presented at NCST 2025 (Preprint available).');
  // });
  
  // document.getElementById('researchBtn2')?.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   showModal('📑 Extended Abstract', 'Optimizing Heart Disease Analysis with Feature Engineering - Under review in Journal of AI in Healthcare.');
  // });

  // ========== CONTACT FORM ==========
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMsg')?.value.trim();
    
    if(name && email && message) {
      showModal('📨 Message Sent', `Thank you ${name}! Your message has been received. I'll get back to you within 48 hours.`);
      document.getElementById('contactForm').reset();
    } else {
      showModal('⚠️ Incomplete Form', 'Please fill in all required fields (Name, Email, and Message).');
    }
  });

  // Show summary page by default
  showPage('page-summary');