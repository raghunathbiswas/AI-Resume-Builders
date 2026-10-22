document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form');
  const preview = document.getElementById('resume-preview');
  const templateSelect = document.getElementById('template-select');
  const downloadBtn = document.getElementById('download-btn');
  const sampleBtn = document.getElementById('sample-data-btn');

  // ---------- Helpers ----------
  const createInput = (labelText, name, placeholder = '', required = false) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'sub-form-group';
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.placeholder = placeholder;
    if (required) input.required = true;
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  };

  const createTextarea = (labelText, name, rows = 2, placeholder = '') => {
    const wrapper = document.createElement('div');
    wrapper.className = 'sub-form-group';
    const label = document.createElement('label');
    label.textContent = labelText;
    const textarea = document.createElement('textarea');
    textarea.name = name;
    textarea.rows = rows;
    textarea.placeholder = placeholder;
    wrapper.appendChild(label);
    wrapper.appendChild(textarea);
    return wrapper;
  };

  const addSectionItem = (sectionId, fields) => {
    const container = document.getElementById(sectionId + '-list');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'section-item';
    fields.forEach(f => {
      itemDiv.appendChild(createInput(f.label, `${sectionId}_${f.name}`));
    });
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => container.removeChild(itemDiv);
    itemDiv.appendChild(removeBtn);
    container.appendChild(itemDiv);
  };

  // ---------- Add button handlers ----------
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      switch (section) {
        case 'education':
          addSectionItem('education', [
            { label: 'Degree', name: 'degree' },
            { label: 'Institution', name: 'institution' },
            { label: 'Start Year', name: 'start' },
            { label: 'End Year', name: 'end' },
            { label: 'Details', name: 'details' },
          ]);
          break;
        case 'experience':
          addSectionItem('experience', [
            { label: 'Job Title', name: 'title' },
            { label: 'Company', name: 'company' },
            { label: 'Start Date', name: 'start' },
            { label: 'End Date', name: 'end' },
            { label: 'Description', name: 'desc' },
          ]);
          break;
        case 'projects':
          addSectionItem('projects', [
            { label: 'Project Name', name: 'name' },
            { label: 'Link (optional)', name: 'link' },
            { label: 'Description', name: 'desc' },
          ]);
          break;
        case 'certifications':
          addSectionItem('certifications', [
            { label: 'Title', name: 'title' },
            { label: 'Issuer', name: 'issuer' },
            { label: 'Year', name: 'year' },
          ]);
          break;
        default:
          break;
      }
    });
  });

  // ---------- Render preview ----------
  const renderResume = (data) => {
    const tmpl = templateSelect.value;
    preview.className = `resume-template ${tmpl}`;
    preview.innerHTML = '';

    const header = document.createElement('div');
    header.innerHTML = `<h1>${data.fullName || ''}</h1>` +
      `<p>${data.email || ''} | ${data.phone || ''}</p>`;
    preview.appendChild(header);

    if (data.summary) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      sec.innerHTML = `<h4>Professional Summary</h4><p>${data.summary}</p>`;
      preview.appendChild(sec);
    }

    if (data.skills) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      const list = data.skills.split(',').map(s => s.trim()).filter(Boolean).join(', ');
      sec.innerHTML = `<h4>Technical Skills</h4><p>${list}</p>`;
      preview.appendChild(sec);
    }

    if (data.education && data.education.length) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      sec.innerHTML = '<h4>Education</h4>';
      data.education.forEach(ed => {
        const div = document.createElement('div');
        div.innerHTML = `<h5>${ed.degree || ''} – ${ed.institution || ''}</h5>` +
          `<p>${ed.start || ''} - ${ed.end || ''}</p>` +
          `<p>${ed.details || ''}</p>`;
        sec.appendChild(div);
      });
      preview.appendChild(sec);
    }

    if (data.experience && data.experience.length) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      sec.innerHTML = '<h4>Work Experience</h4>';
      data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.innerHTML = `<h5>${exp.title || ''} – ${exp.company || ''}</h5>` +
          `<p>${exp.start || ''} - ${exp.end || ''}</p>` +
          `<p>${exp.desc || ''}</p>`;
        sec.appendChild(div);
      });
      preview.appendChild(sec);
    }

    if (data.projects && data.projects.length) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      sec.innerHTML = '<h4>Projects</h4>';
      data.projects.forEach(p => {
        const div = document.createElement('div');
        const title = p.link ? `<a href="${p.link}" target="_blank">${p.name}</a>` : p.name;
        div.innerHTML = `<h5>${title}</h5>` +
          `<p>${p.desc || ''}</p>`;
        sec.appendChild(div);
      });
      preview.appendChild(sec);
    }

    if (data.certifications && data.certifications.length) {
      const sec = document.createElement('section');
      sec.className = 'resume-section';
      sec.innerHTML = '<h4>Certifications</h4>';
      data.certifications.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `<h5>${c.title || ''} – ${c.issuer || ''}</h5>` +
          `<p>${c.year || ''}</p>`;
        sec.appendChild(div);
      });
      preview.appendChild(sec);
    }
  };

  // ---------- Collect form data ----------
  const collectFormData = () => {
    const fd = new FormData(form);
    const data = {
      fullName: fd.get('fullName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      summary: fd.get('summary'),
      skills: fd.get('skills'),
      education: [],
      experience: [],
      projects: [],
      certifications: [],
    };
    // Helper to pull repeated sections based on naming pattern
    const pullSection = (prefix, fields) => {
      const items = [];
      // Determine how many items exist by scanning FormData keys
      const keys = Array.from(fd.keys()).filter(k => k.startsWith(prefix + '_'));
      const indices = new Set();
      keys.forEach(k => {
        const part = k.split('_')[1]; // e.g., education_0_degree => part = '0'
        const idx = part.split('_')[0];
        if (!isNaN(idx)) indices.add(idx);
      });
      indices.forEach(idx => {
        const obj = {};
        fields.forEach(f => {
          const value = fd.get(`${prefix}_${idx}_${f}`) || fd.get(`${prefix}_${f}`) || '';
          // Fallback when we used simple naming without index (current implementation)
          const key = `${prefix}_${f}`;
          obj[f] = fd.get(key) || '';
        });
        // Only push if at least one field is non‑empty
        if (Object.values(obj).some(v => v && v.trim())) items.push(obj);
      });
      return items;
    };
    // Since we added inputs with names like education_degree etc., we cannot rely on index.
    // Simpler: gather by scanning the DOM for .section-item children.
    const gather = (sectionId, fields) => {
      const container = document.getElementById(sectionId + '-list');
      const arr = [];
      container.querySelectorAll('.section-item').forEach(item => {
        const obj = {};
        fields.forEach(f => {
          const inp = item.querySelector(`[name='${sectionId}_${f.name}']`);
          obj[f.name] = inp ? inp.value : '';
        });
        if (Object.values(obj).some(v => v && v.trim())) arr.push(obj);
      });
      return arr;
    };
    data.education = gather('education', [
      {label:'Degree', name:'degree'},
      {label:'Institution', name:'institution'},
      {label:'Start Year', name:'start'},
      {label:'End Year', name:'end'},
      {label:'Details', name:'details'}
    ]);
    data.experience = gather('experience', [
      {label:'Job Title', name:'title'},
      {label:'Company', name:'company'},
      {label:'Start Date', name:'start'},
      {label:'End Date', name:'end'},
      {label:'Description', name:'desc'}
    ]);
    data.projects = gather('projects', [
      {label:'Project Name', name:'name'},
      {label:'Link', name:'link'},
      {label:'Description', name:'desc'}
    ]);
    data.certifications = gather('certifications', [
      {label:'Title', name:'title'},
      {label:'Issuer', name:'issuer'},
      {label:'Year', name:'year'}
    ]);
    return data;
  };

  // ---------- Form submission ----------
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = collectFormData();
    localStorage.setItem('resumeData', JSON.stringify(data));
    renderResume(data);
    alert('Resume saved and preview updated!');
  });

  // ---------- Template change ----------
  templateSelect.addEventListener('change', () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) renderResume(JSON.parse(saved));
  });

  // ---------- Download / Print ----------
  downloadBtn.addEventListener('click', () => {
    window.print();
  });

  // ---------- Sample data ----------
  const sampleData = {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123‑4567',
    summary: 'Passionate full‑stack developer with 5+ years of experience building web applications.',
    skills: 'JavaScript, HTML, CSS, React, Node.js, Express, MongoDB, Git',
    education: [{
      degree: 'B.Sc. Computer Science',
      institution: 'University of Example',
      start: '2014',
      end: '2018',
      details: 'Graduated with First Class Honors.'
    }],
    experience: [{
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      start: 'Jan 2020',
      end: 'Present',
      desc: 'Lead a team of 5 developers to deliver scalable SaaS products.'
    }],
    projects: [{
      name: 'ResumeCraft AI',
      link: '',
      desc: 'A client‑side resume builder with live preview and PDF export.'
    }],
    certifications: [{
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon',
      year: '2021'
    }]
  };

  sampleBtn.addEventListener('click', () => {
    // Clear existing dynamic sections
    ['education', 'experience', 'projects', 'certifications'].forEach(section => {
      document.getElementById(section + '-list').innerHTML = '';
    });
    // Populate static fields
    form.fullName.value = sampleData.fullName;
    form.email.value = sampleData.email;
    form.phone.value = sampleData.phone;
    form.summary.value = sampleData.summary;
    form.skills.value = sampleData.skills;
    // Populate arrays
    const addItems = (section, items, fields) => {
      items.forEach(item => {
        addSectionItem(section, fields);
        const last = document.getElementById(section + '-list').lastElementChild;
        fields.forEach(f => {
          const inp = last.querySelector(`[name='${section}_${f.name}']`);
          if (inp) inp.value = item[f.name] || '';
        });
      });
    };
    addItems('education', sampleData.education, [
      {label:'Degree', name:'degree'},
      {label:'Institution', name:'institution'},
      {label:'Start Year', name:'start'},
      {label:'End Year', name:'end'},
      {label:'Details', name:'details'}
    ]);
    addItems('experience', sampleData.experience, [
      {label:'Job Title', name:'title'},
      {label:'Company', name:'company'},
      {label:'Start Date', name:'start'},
      {label:'End Date', name:'end'},
      {label:'Description', name:'desc'}
    ]);
    addItems('projects', sampleData.projects, [
      {label:'Project Name', name:'name'},
      {label:'Link (optional)', name:'link'},
      {label:'Description', name:'desc'}
    ]);
    addItems('certifications', sampleData.certifications, [
      {label:'Title', name:'title'},
      {label:'Issuer', name:'issuer'},
      {label:'Year', name:'year'}
    ]);
    // Save and render preview immediately
    const data = collectFormData();
    localStorage.setItem('resumeData', JSON.stringify(data));
    renderResume(data);
  });

  // ---------- Load persisted data on start ----------
  const persisted = localStorage.getItem('resumeData');
  if (persisted) {
    const data = JSON.parse(persisted);
    // Populate form fields where possible (simple static ones)
    form.fullName.value = data.fullName || '';
    form.email.value = data.email || '';
    form.phone.value = data.phone || '';
    form.summary.value = data.summary || '';
    form.skills.value = data.skills || '';
    // Dynamic sections are not auto‑filled for brevity – they will be rendered in preview.
    renderResume(data);
  }
});
