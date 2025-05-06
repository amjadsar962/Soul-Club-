document.addEventListener('DOMContentLoaded', function() {
    // شريط التحميل
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);

    // القائمة المتحركة للهواتف
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav ul li a:not(.btn)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير التمرير للهيدر
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // زر العودة للأعلى
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // زر العودة للأعلى
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // عداد الإحصائيات
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // تنشيط العدادات عند التمرير إلى القسم
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    // تصفية الدورات
    const courseCategories = document.querySelectorAll('.course-categories li');
    const coursesGrid = document.querySelector('.courses-grid');
    
    // بيانات الدورات (يمكن استبدالها ببيانات حقيقية من قاعدة بيانات)
    const coursesData = [
        {
            id: 1,
            title: 'أساسيات الأردوينو',
            description: 'تعلم أساسيات البرمجة والإلكترونيات باستخدام الأردوينو من الصفر حتى الاحتراف.',
            category: 'arduino',
            instructor: 'أحمد محمد',
            price: '199 ر.س',
            image: 'images/course1.jpg'
        },
        {
            id: 2,
            title: 'برمجة الروبوتات',
            description: 'دورة متكاملة لتعلم برمجة الروبوتات وتطبيقاتها العملية.',
            category: 'robotics',
            instructor: 'سارة عبدالله',
            price: '299 ر.س',
            image: 'images/course2.jpg'
        },
        {
            id: 3,
            title: 'الذكاء الاصطناعي للمبتدئين',
            description: 'مدخل إلى عالم الذكاء الاصطناعي وتعلم الآلة بأسلوب مبسط.',
            category: 'ai',
            instructor: 'خالد علي',
            price: '349 ر.س',
            image: 'images/course3.jpg'
        },
        {
            id: 4,
            title: 'إنترنت الأشياء',
            description: 'تعلم كيفية بناء أنظمة إنترنت الأشياء باستخدام الأردوينو و NodeMCU.',
            category: 'iot',
            instructor: 'نورة سالم',
            price: '249 ر.س',
            image: 'images/course4.jpg'
        },
        {
            id: 5,
            title: 'رؤية الحاسوب',
            description: 'تعلم معالجة الصور والتعرف على الأشياء باستخدام بايثون و OpenCV.',
            category: 'ai',
            instructor: 'فيصل أحمد',
            price: '399 ر.س',
            image: 'images/course5.jpg'
        },
        {
            id: 6,
            title: 'التصنيع الرقمي',
            description: 'تعلم كيفية استخدام الطابعات ثلاثية الأبعاد وأدوات التصنيع الرقمي.',
            category: 'robotics',
            instructor: 'لمى عبدالرحمن',
            price: '279 ر.س',
            image: 'images/course6.jpg'
        }
    ];
    
    // عرض الدورات في الشبكة
    function displayCourses(category = 'all') {
        coursesGrid.innerHTML = '';
        
        const filteredCourses = category === 'all' 
            ? coursesData 
            : coursesData.filter(course => course.category === category);
        
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-card-img">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="course-category">${getCategoryName(course.category)}</span>
                </div>
                <div class="course-card-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <div class="course-instructor">
                            <img src="images/instructor${course.id}.jpg" alt="${course.instructor}">
                            <span>${course.instructor}</span>
                        </div>
                        <div class="course-price">${course.price}</div>
                    </div>
                </div>
            `;
            coursesGrid.appendChild(courseCard);
        });
    }
    
    // الحصول على اسم الفئة بشكل كامل
    function getCategoryName(category) {
        const categories = {
            arduino: 'الأردوينو',
            robotics: 'الروبوتات',
            ai: 'الذكاء الاصطناعي',
            iot: 'إنترنت الأشياء'
        };
        return categories[category] || category;
    }
    
    // تصفية الدورات حسب الفئة
    courseCategories.forEach(category => {
        category.addEventListener('click', function() {
            courseCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            displayCourses(this.getAttribute('data-category'));
        });
    });
    
    // عرض جميع الدورات عند التحميل
    displayCourses();
    
    // تصفية المشاريع
    const projectTabs = document.querySelectorAll('.projects-tabs li');
    const projectsContainer = document.querySelector('.projects-container');
    const projectModal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // بيانات المشاريع (يمكن استبدالها ببيانات حقيقية من قاعدة بيانات)
    const projectsData = [
        {
            id: 1,
            title: 'روبوت متتبع الخط',
            description: 'روبوت قادر على تتبع الخطوط الملونة باستخدام حساسات الأشعة تحت الحمراء وخوارزميات معالجة الصور.',
            category: 'robotics',
            images: ['images/project1-1.jpg', 'images/project1-2.jpg', 'images/project1-3.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'أردوينو UNO، حساسات الأشعة تحت الحمراء، محركات DC، لوحة توصيل'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'C++ (لغة الأردوينو)'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '15 مارس 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'أحمد محمد، سارة عبدالله'
                }
            ],
            link: '#'
        },
        {
            id: 2,
            title: 'نظام ري ذكي',
            description: 'نظام ري آلي يعمل حسب رطوبة التربة وحالة الطقس، مع إمكانية التحكم عن بعد عبر تطبيق الهاتف.',
            category: 'iot',
            images: ['images/project2-1.jpg', 'images/project2-2.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'أردوينو NodeMCU، حساس رطوبة التربة، مضخة ماء، وحدة WiFi'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'C++، JavaScript، HTML/CSS'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '2 فبراير 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'خالد علي، نورة سالم'
                }
            ],
            link: '#'
        },
        {
            id: 3,
            title: 'ذراع روبوتي',
            description: 'ذراع روبوتي متحكم به عبر تطبيق الهاتف، قادر على التقاط ونقل الأشياء بدقة.',
            category: 'robotics',
            images: ['images/project3-1.jpg', 'images/project3-2.jpg', 'images/project3-3.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'أردوينو Mega، محركات Servo، وحدة Bluetooth، هيكل الأكريليك'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'C++، Java (للتطبيق)'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '10 أبريل 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'فيصل أحمد، لمى عبدالرحمن'
                }
            ],
            link: '#'
        },
        {
            id: 4,
            title: 'منزل ذكي',
            description: 'نظام تحكم ذكي في إضاءة وأجهزة المنزل عبر الإنترنت باستخدام تقنيات إنترنت الأشياء.',
            category: 'iot',
            images: ['images/project4-1.jpg', 'images/project4-2.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'أردوينو NodeMCU، حساسات حركة، مصابيح ذكية، لوحة تحكم'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'C++، Python، JavaScript'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '25 يناير 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'أحمد محمد، نورة سالم'
                }
            ],
            link: '#'
        },
        {
            id: 5,
            title: 'نظام التعرف على الوجوه',
            description: 'نظام للتعرف على الوجوه باستخدام كاميرا Raspberry Pi وخوارزميات الذكاء الاصطناعي.',
            category: 'ai',
            images: ['images/project5-1.jpg', 'images/project5-2.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'Raspberry Pi 4، كاميرا PI، شاشة LCD'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'Python، OpenCV، TensorFlow'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '8 مايو 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'سارة عبدالله، فيصل أحمد'
                }
            ],
            link: '#'
        },
        {
            id: 6,
            title: 'طائرة بدون طيار',
            description: 'طائرة درون قادرة على التصوير الجوي وتتبع الأجسام باستخدام تقنيات الرؤية الحاسوبية.',
            category: 'robotics',
            images: ['images/project6-1.jpg', 'images/project6-2.jpg'],
            details: [
                {
                    icon: 'fas fa-microchip',
                    title: 'المكونات',
                    content: 'إطار DJI، محركات Brushless، وحدة تحكم Flight Controller، كاميرا'
                },
                {
                    icon: 'fas fa-code',
                    title: 'اللغات المستخدمة',
                    content: 'C++، Python'
                },
                {
                    icon: 'fas fa-calendar-alt',
                    title: 'تاريخ الإنجاز',
                    content: '22 يونيو 2023'
                },
                {
                    icon: 'fas fa-users',
                    title: 'فريق العمل',
                    content: 'خالد علي، لمى عبدالرحمن'
                }
            ],
            link: '#'
        }
    ];
    
    // عرض المشاريع في الشبكة
    function displayProjects(filter = 'all') {
        projectsContainer.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-card-img">
                    <img src="${project.images[0]}" alt="${project.title}">
                </div>
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-card-meta">
                        <span class="project-category ${project.category}">${getCategoryName(project.category)}</span>
                        <a href="#" class="project-link" data-project-id="${project.id}">
                            <i class="fas fa-arrow-left"></i> عرض التفاصيل
                        </a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
        
        // إضافة حدث النقر لعرض تفاصيل المشروع
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project-id');
                const project = projectsData.find(p => p.id == projectId);
                showProjectModal(project);
            });
        });
    }
    
    // عرض نافذة تفاصيل المشروع
    function showProjectModal(project) {
        const modalBody = document.querySelector('.modal-project-body');
        const modalContent = document.querySelector('.modal-content');
        
        // إنشاء محتوى النافذة
        const modalHTML = `
            <h3 class="modal-project-title">${project.title}</h3>
            <span class="modal-project-category ${project.category}">${getCategoryName(project.category)}</span>
            
            <div class="modal-project-images">
                <div class="swiper modal-project-slider">
                    <div class="swiper-wrapper">
                        ${project.images.map(img => `
                            <div class="swiper-slide">
                                <img src="${img}" alt="${project.title}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                
                <div class="swiper modal-project-thumbs">
                    <div class="swiper-wrapper">
                        ${project.images.map(img => `
                            <div class="swiper-slide">
                                <img src="${img}" alt="${project.title}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-project-description">
                <h4>وصف المشروع</h4>
                <p>${project.description}</p>
            </div>
            
            <div class="modal-project-details">
                ${project.details.map(detail => `
                    <div class="modal-project-detail">
                        <h5><i class="${detail.icon}"></i> ${detail.title}</h5>
                        <p>${detail.content}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-project-links">
                <a href="${project.link}" class="btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> عرض المشروع
                </a>
                <a href="#" class="btn btn-outline" id="close-project-modal">
                    <i class="fas fa-times"></i> إغلاق
                </a>
            </div>
        `;
        
        document.querySelector('.modal-body').innerHTML = modalHTML;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // تهيئة Swiper للمعرض
        const projectSlider = new Swiper('.modal-project-slider', {
            loop: true,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: new Swiper('.modal-project-thumbs', {
                    loop: true,
                    spaceBetween: 10,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesProgress: true,
                }),
            },
        });
        
        // إغلاق النافذة عند النقر على الزر
        document.getElementById('close-project-modal').addEventListener('click', function(e) {
            e.preventDefault();
            closeProjectModal();
        });
    }
    
    // إغلاق نافذة المشروع
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // إغلاق النافذة عند النقر خارجها
    projectModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });
    
    // إغلاق النافذة عند النقر على الزر X
    closeModal.addEventListener('click', closeProjectModal);
    
    // تصفية المشاريع حسب الفئة
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            projectTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            displayProjects(this.getAttribute('data-filter'));
        });
    });
    
    // عرض جميع المشاريع عند التحميل
    displayProjects();
    
    // معرض الصور
    const gallerySwiper = new Swiper('.gallery-swiper', {
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
    
    // بيانات معرض الصور (يمكن استبدالها ببيانات حقيقية من قاعدة بيانات)
    const galleryData = [
        'images/gallery1.jpg',
        'images/gallery2.jpg',
        'images/gallery3.jpg',
        'images/gallery4.jpg',
        'images/gallery5.jpg',
        'images/gallery6.jpg',
        'images/gallery7.jpg',
        'images/gallery8.jpg'
    ];
    
    // ملء معرض الصور بالبيانات
    const galleryWrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
    galleryData.forEach(img => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide gallery-slide';
        slide.innerHTML = `<img src="${img}" alt="معرض الصور">`;
        galleryWrapper.appendChild(slide);
    });
    
    // إعادة تهيئة Swiper بعد إضافة الشرائح
    gallerySwiper.update();
    
    // المدونة
    const blogContainer = document.querySelector('.blog-container');
    
    // بيانات المدونة (يمكن استبدالها ببيانات حقيقية من قاعدة بيانات)
    const blogData = [
        {
            id: 1,
            title: 'مستقبل الروبوتات في العالم العربي',
            excerpt: 'كيف يمكن للروبوتات أن تغير مستقبل الصناعة والتعليم في الوطن العربي؟',
            date: '15 يونيو 2023',
            author: 'أحمد محمد',
            image: 'images/blog1.jpg',
            category: 'روبوتات'
        },
        {
            id: 2,
            title: 'دليل المبتدئين للأردوينو',
            excerpt: 'كل ما تحتاج معرفته للبدء في عالم الأردوينو والإلكترونيات.',
            date: '5 يونيو 2023',
            author: 'سارة عبدالله',
            image: 'images/blog2.jpg',
            category: 'أردوينو'
        },
        {
            id: 3,
            title: 'تطبيقات الذكاء الاصطناعي في الحياة اليومية',
            excerpt: 'كيف يدخل الذكاء الاصطناعي في تفاصيل حياتنا دون أن نلاحظ؟',
            date: '28 مايو 2023',
            author: 'خالد علي',
            image: 'images/blog3.jpg',
            category: 'ذكاء اصطناعي'
        }
    ];
    
    // عرض مقالات المدونة
    blogData.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-card-img">
                <img src="${post.image}" alt="${post.title}">
                <span class="blog-card-date">${post.date}</span>
            </div>
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-card-meta">
                    <div class="blog-card-author">
                        <img src="images/author${post.id}.jpg" alt="${post.author}">
                        <span>${post.author}</span>
                    </div>
                    <a href="#" class="blog-card-link">
                        <i class="fas fa-arrow-left"></i> اقرأ المزيد
                    </a>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
    
    // الشركاء
    const partnersSwiper = new Swiper('.partners-swiper', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            },
        }
    });
    
    // بيانات الشركاء (يمكن استبدالها ببيانات حقيقية)
    const partnersData = [
        'images/partner1.png',
        'images/partner2.png',
        'images/partner3.png',
        'images/partner4.png',
        'images/partner5.png',
        'images/partner6.png'
    ];
    
    // ملء شرائح الشركاء
    const partnersWrapper = document.querySelector('.partners-swiper .swiper-wrapper');
    partnersData.forEach(logo => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide partner-slide';
        slide.innerHTML = `<img src="${logo}" alt="شريك">`;
        partnersWrapper.appendChild(slide);
    });
    
    // إعادة تهيئة Swiper بعد إضافة الشرائح
    partnersSwiper.update();
    
    // نموذج التسجيل
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const level = document.getElementById('reg-level').value;
            const interests = document.getElementById('reg-interests').value;
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            console.log('تم التسجيل:', { name, email, phone, level, interests });
            
            // عرض رسالة نجاح
            Swal.fire({
                icon: 'success',
                title: 'تم التسجيل بنجاح!',
                text: 'شكرًا لتسجيلك في نادي سول. سنتواصل معك قريبًا.',
                confirmButtonText: 'حسنًا'
            });
            
            // إعادة تعيين النموذج
            registrationForm.reset();
        });
    }
    
    // نموذج الاتصال
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            console.log('تم إرسال الرسالة:', { name, email, subject, message });
            
            // عرض رسالة نجاح
            Swal.fire({
                icon: 'success',
                title: 'تم إرسال رسالتك!',
                text: 'شكرًا لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.',
                confirmButtonText: 'حسنًا'
            });
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }
    
    // النشرة البريدية
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            // هنا يمكنك إضافة كود لإرسال البريد إلى الخادم
            console.log('اشتراك في النشرة:', email);
            
            // عرض رسالة نجاح
            Swal.fire({
                icon: 'success',
                title: 'تم الاشتراك بنجاح!',
                text: 'شكرًا لاشتراكك في نشرتنا البريدية.',
                confirmButtonText: 'حسنًا'
            });
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }
    
    // تهيئة تأثيرات الحركة (AOS)
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });
});
