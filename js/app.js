/**
 * SAP SD Crash Course 2026
 * Main Application JavaScript
 * Features: Theme toggle, search, progress tracking, animations, accordions
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const themeToggle = document.getElementById('themeToggle');
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const closeSearch = document.getElementById('closeSearch');
    const backToTop = document.getElementById('backToTop');
    const progressBtn = document.getElementById('progressBtn');
    const progressText = document.getElementById('progressText');
    const progressCircle = document.getElementById('progressCircle');

    // ============================================
    // State
    // ============================================
    let completedTopics = JSON.parse(localStorage.getItem('sapsd_progress') || '[]');
    let bookmarks = JSON.parse(localStorage.getItem('sapsd_bookmarks') || '[]');
    let currentTheme = localStorage.getItem('sapsd_theme') || 'light';

    // ============================================
    // Search Data
    // ============================================
    const searchData = [
        // Transaction Codes
        { type: 'tcode', code: 'VA01', title: 'Create Sales Order', section: 'transactions', keywords: 'create sales order standard' },
        { type: 'tcode', code: 'VA02', title: 'Change Sales Order', section: 'transactions', keywords: 'change modify sales order' },
        { type: 'tcode', code: 'VA03', title: 'Display Sales Order', section: 'transactions', keywords: 'display view sales order' },
        { type: 'tcode', code: 'VL01N', title: 'Create Outbound Delivery', section: 'transactions', keywords: 'create delivery shipping outbound' },
        { type: 'tcode', code: 'VL02N', title: 'Change Outbound Delivery', section: 'transactions', keywords: 'change delivery picking packing pgi goods issue' },
        { type: 'tcode', code: 'VF01', title: 'Create Billing Document', section: 'transactions', keywords: 'create billing invoice' },
        { type: 'tcode', code: 'VF04', title: 'Billing Due List', section: 'transactions', keywords: 'billing due list pending' },
        { type: 'tcode', code: 'XD01', title: 'Create Customer (Central)', section: 'transactions', keywords: 'create customer master central' },
        { type: 'tcode', code: 'XD02', title: 'Change Customer (Central)', section: 'transactions', keywords: 'change customer master central' },
        { type: 'tcode', code: 'MM01', title: 'Create Material', section: 'transactions', keywords: 'create material master product' },
        { type: 'tcode', code: 'MM03', title: 'Display Material', section: 'transactions', keywords: 'display material master product view' },
        { type: 'tcode', code: 'VK11', title: 'Create Condition Record', section: 'transactions', keywords: 'create condition price pricing discount' },
        { type: 'tcode', code: 'FD32', title: 'Change Customer Credit', section: 'transactions', keywords: 'credit limit customer change' },
        { type: 'tcode', code: 'VKM1', title: 'Blocked SD Documents', section: 'transactions', keywords: 'blocked orders credit release' },
        { type: 'tcode', code: 'VA21', title: 'Create Quotation', section: 'transactions', keywords: 'create quotation quote offer' },
        { type: 'tcode', code: 'VA11', title: 'Create Inquiry', section: 'transactions', keywords: 'create inquiry pre-sales' },
        { type: 'tcode', code: 'MMBE', title: 'Stock Overview', section: 'transactions', keywords: 'stock inventory overview' },
        { type: 'tcode', code: 'CO09', title: 'Availability Check', section: 'transactions', keywords: 'atp availability check stock' },
        { type: 'tcode', code: 'VL09', title: 'Cancel Goods Issue', section: 'transactions', keywords: 'cancel reverse goods issue pgi' },
        { type: 'tcode', code: 'VF11', title: 'Cancel Billing Document', section: 'transactions', keywords: 'cancel reverse billing invoice' },
        
        // Concepts
        { type: 'concept', title: 'Order-to-Cash (O2C)', section: 'order-to-cash', keywords: 'order to cash o2c cycle process flow' },
        { type: 'concept', title: 'Customer Master Data', section: 'master-data', keywords: 'customer master data who partner' },
        { type: 'concept', title: 'Material Master Data', section: 'master-data', keywords: 'material master data product what' },
        { type: 'concept', title: 'Condition Master (Pricing)', section: 'master-data', keywords: 'condition pricing price discount how much' },
        { type: 'concept', title: 'Sales Organization', section: 'foundations', keywords: 'sales organization org structure' },
        { type: 'concept', title: 'Distribution Channel', section: 'foundations', keywords: 'distribution channel wholesale retail internet' },
        { type: 'concept', title: 'Division', section: 'foundations', keywords: 'division product line bikes accessories' },
        { type: 'concept', title: 'Sales Area', section: 'foundations', keywords: 'sales area combination unique' },
        { type: 'concept', title: 'Availability Check (ATP)', section: 'order-to-cash', keywords: 'availability check atp available to promise stock' },
        { type: 'concept', title: 'Credit Management', section: 'order-to-cash', keywords: 'credit management limit blocked' },
        { type: 'concept', title: 'Goods Issue (PGI)', section: 'order-to-cash', keywords: 'goods issue pgi post shipping delivery' },
        { type: 'concept', title: 'Billing Document', section: 'order-to-cash', keywords: 'billing document invoice accounting' },
        { type: 'concept', title: 'Document Flow', section: 'order-to-cash', keywords: 'document flow audit trail' },
        { type: 'concept', title: 'Partner Functions', section: 'master-data', keywords: 'partner functions sold-to ship-to bill-to payer' },
        { type: 'concept', title: 'Pricing Procedure', section: 'master-data', keywords: 'pricing procedure calculation schema' },
        { type: 'concept', title: 'SD-FI Integration', section: 'integration', keywords: 'sd fi integration accounting financial' },
        { type: 'concept', title: 'SD-MM Integration', section: 'integration', keywords: 'sd mm integration materials management inventory' },
        
        // Sections
        { type: 'section', title: 'Foundations & Organizational Structure', section: 'foundations', keywords: 'part 1 foundations organizational structure basics' },
        { type: 'section', title: 'Master Data', section: 'master-data', keywords: 'part 2 master data building blocks' },
        { type: 'section', title: 'Order-to-Cash Process', section: 'order-to-cash', keywords: 'part 3 order to cash o2c workflow process' },
        { type: 'section', title: 'Transaction Codes Reference', section: 'transactions', keywords: 'part 4 transaction codes t-codes reference' },
        { type: 'section', title: 'Integration with Other Modules', section: 'integration', keywords: 'part 5 integration modules fi mm pp co' },
        { type: 'section', title: 'Practice Exercises', section: 'practice', keywords: 'part 6 practice exercises scenarios hands-on' },
    ];

    // ============================================
    // Initialization
    // ============================================
    function init() {
        // Hide loader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');
                }
            }, 1000);
        });

        // Initialize theme
        initTheme();
        
        // Initialize progress
        updateProgress();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize animations
        initAnimations();
        
        // Initialize accordions
        initAccordions();
        
        // Initialize expandable cards
        initExpandableCards();
        
        // Count up stats animation
        initCountUp();
    }

    // ============================================
    // Theme
    // ============================================
    function initTheme() {
        // Check for saved theme or system preference
        if (currentTheme === 'dark' || 
            (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            currentTheme = 'dark';
        }
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('sapsd_theme', currentTheme);
    }

    // ============================================
    // Event Listeners
    // ============================================
    function initEventListeners() {
        // Scroll events
        window.addEventListener('scroll', handleScroll);
        
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Mobile menu
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }
        
        // Search
        if (searchBtn) {
            searchBtn.addEventListener('click', openSearch);
        }
        if (closeSearch) {
            closeSearch.addEventListener('click', closeSearchModal);
        }
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }
        if (searchModal) {
            searchModal.querySelector('.modal-overlay').addEventListener('click', closeSearchModal);
        }
        
        // Search suggestions
        document.querySelectorAll('.search-suggestion').forEach(btn => {
            btn.addEventListener('click', function() {
                searchInput.value = this.dataset.search;
                handleSearch();
            });
        });
        
        // Back to top
        if (backToTop) {
            backToTop.addEventListener('click', scrollToTop);
        }
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
                closeMobileMenu();
            });
        });
        
        // Completion checkboxes
        document.querySelectorAll('.completion-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', handleCompletionToggle);
            // Restore state
            if (completedTopics.includes(checkbox.dataset.topic)) {
                checkbox.checked = true;
            }
        });
        
        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', handleBookmarkToggle);
            if (bookmarks.includes(btn.dataset.section)) {
                btn.classList.add('active');
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);
        
        // T-Code search
        const tcodeSearch = document.getElementById('tcodeSearch');
        if (tcodeSearch) {
            tcodeSearch.addEventListener('input', handleTCodeSearch);
        }
        
        // T-Code filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });
        
        // T-Code items click to copy
        document.querySelectorAll('.tcode-item').forEach(item => {
            item.addEventListener('click', function() {
                const tcode = this.querySelector('.tcode').textContent;
                copyToClipboard(tcode);
                showToast(`Copied: ${tcode}`);
            });
        });
    }

    // ============================================
    // Scroll Handling
    // ============================================
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Header shadow
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Back to top visibility
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Update active nav link
        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    function scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        
        // Create mobile menu if doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = nav.innerHTML;
            document.body.appendChild(mobileMenu);
            
            // Add click handlers to mobile menu links
            mobileMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                    closeMobileMenu();
                });
            });
        }
        
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    // ============================================
    // Search
    // ============================================
    function openSearch() {
        if (searchModal) {
            searchModal.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = getSearchHint();
            document.body.style.overflow = '';
        }
    }

    function getSearchHint() {
        return `
            <div class="search-hint">
                <p>Try searching for:</p>
                <div class="search-suggestions">
                    <button class="search-suggestion" data-search="VA01">VA01</button>
                    <button class="search-suggestion" data-search="Order-to-Cash">Order-to-Cash</button>
                    <button class="search-suggestion" data-search="Customer Master">Customer Master</button>
                    <button class="search-suggestion" data-search="Pricing">Pricing</button>
                    <button class="search-suggestion" data-search="Delivery">Delivery</button>
                </div>
            </div>
        `;
    }

    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (!query) {
            searchResults.innerHTML = getSearchHint();
            initSearchSuggestions();
            return;
        }
        
        const results = searchData.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   (item.code && item.code.toLowerCase().includes(query)) ||
                   item.keywords.toLowerCase().includes(query);
        });
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>No results found for "${query}"</p>
                    <p class="text-muted">Try different keywords</p>
                </div>
            `;
            return;
        }
        
        searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" data-section="${item.section}">
                <div class="result-icon">${getResultIcon(item.type)}</div>
                <div class="result-content">
                    <div class="result-title">${item.code ? `<span class="tcode-mini">${item.code}</span> ` : ''}${item.title}</div>
                    <div class="result-desc">${item.type === 'tcode' ? 'Transaction Code' : item.type === 'concept' ? 'Concept' : 'Section'}</div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const section = this.dataset.section;
                closeSearchModal();
                scrollToSection(section);
            });
        });
    }

    function getResultIcon(type) {
        switch (type) {
            case 'tcode': return '⌨️';
            case 'concept': return '💡';
            case 'section': return '📚';
            default: return '📄';
        }
    }

    function initSearchSuggestions() {
        document.querySelectorAll('.search-suggestion').forEach(btn => {
            btn.addEventListener('click', function() {
                searchInput.value = this.dataset.search;
                handleSearch();
            });
        });
    }

    // ============================================
    // T-Code Search & Filter
    // ============================================
    function handleTCodeSearch() {
        const query = this.value.toLowerCase().trim();
        const items = document.querySelectorAll('.tcode-item');
        
        items.forEach(item => {
            const tcode = item.querySelector('.tcode').textContent.toLowerCase();
            const desc = item.querySelector('.tdesc').textContent.toLowerCase();
            const keywords = item.dataset.keywords ? item.dataset.keywords.toLowerCase() : '';
            
            if (tcode.includes(query) || desc.includes(query) || keywords.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function handleFilterClick() {
        const filter = this.dataset.filter;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter categories
        const categories = document.querySelectorAll('.tcode-category');
        
        if (filter === 'all') {
            categories.forEach(cat => {
                cat.style.display = '';
            });
        } else {
            categories.forEach(cat => {
                if (cat.dataset.category === filter) {
                    cat.style.display = '';
                } else {
                    cat.style.display = 'none';
                }
            });
        }
    }

    // ============================================
    // Progress Tracking
    // ============================================
    function handleCompletionToggle() {
        const topic = this.dataset.topic;
        
        if (this.checked) {
            if (!completedTopics.includes(topic)) {
                completedTopics.push(topic);
            }
        } else {
            completedTopics = completedTopics.filter(t => t !== topic);
        }
        
        localStorage.setItem('sapsd_progress', JSON.stringify(completedTopics));
        updateProgress();
        updateProgressSidebar();
    }

    function updateProgress() {
        const totalTopics = document.querySelectorAll('.completion-checkbox input').length;
        const completed = completedTopics.length;
        const percentage = totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0;
        
        if (progressText) {
            progressText.textContent = `${percentage}%`;
        }
        
        if (progressCircle) {
            const circumference = 100;
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    function updateProgressSidebar() {
        const sectionProgress = {
            'foundations': ['foundations-complete'],
            'master-data': ['master-data-complete'],
            'order-to-cash': ['o2c-understanding', 'order-to-cash-complete'],
            'transactions': ['transactions-complete'],
            'integration': ['integration-complete'],
            'practice': ['exercise-1-complete', 'practice-complete']
        };
        
        document.querySelectorAll('.progress-item').forEach(item => {
            const section = item.dataset.section;
            const topics = sectionProgress[section] || [];
            const isCompleted = topics.some(t => completedTopics.includes(t));
            
            if (isCompleted) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    }

    // ============================================
    // Bookmarks
    // ============================================
    function handleBookmarkToggle() {
        const section = this.dataset.section;
        
        if (bookmarks.includes(section)) {
            bookmarks = bookmarks.filter(b => b !== section);
            this.classList.remove('active');
        } else {
            bookmarks.push(section);
            this.classList.add('active');
        }
        
        localStorage.setItem('sapsd_bookmarks', JSON.stringify(bookmarks));
    }

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    function handleKeyboard(e) {
        // Escape to close modal
        if (e.key === 'Escape') {
            closeSearchModal();
            closeMobileMenu();
        }
        
        // Cmd/Ctrl + K to open search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    }

    // ============================================
    // Animations
    // ============================================
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    function initCountUp() {
        const stats = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }

    function animateCountUp(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ============================================
    // Accordions
    // ============================================
    function initAccordions() {
        document.querySelectorAll('.step-accordion-item').forEach(item => {
            const header = item.querySelector('.step-accordion-header');
            
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other accordions in the same group
                item.parentElement.querySelectorAll('.step-accordion-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // Expandable Cards
    // ============================================
    function initExpandableCards() {
        document.querySelectorAll('.master-data-card').forEach(card => {
            const header = card.querySelector('.card-header');
            
            header.addEventListener('click', function() {
                card.classList.toggle('expanded');
            });
        });
        
        // Expand first card by default
        const firstCard = document.querySelector('.master-data-card');
        if (firstCard) {
            firstCard.classList.add('expanded');
        }
    }

    // ============================================
    // Utilities
    // ============================================
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: var(--color-text);
            color: var(--color-bg);
            border-radius: 8px;
            font-size: 14px;
            z-index: 9999;
            animation: fadeInUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // ============================================
    // Initialize
    // ============================================
    document.addEventListener('DOMContentLoaded', init);

})();
